import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { mapAuthError } from '../lib/authErrors';
import { registerAccount } from '../lib/registerWithoutEmail';
import { saveSecurityAnswers } from '../lib/securityApi';
import { ACCOUNT_DISABLED_MESSAGE, isProfileActive } from '../lib/authMessages';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type { Profile } from '../lib/types';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  configured: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null; role?: Profile['role'] }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    securityAnswers: string[]
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const CONFIG_ERROR =
  'Supabase n\'est pas configuré. Renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local';

async function fetchProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('id, role, email, full_name, is_active, created_at')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data as Profile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(configured);

  const applyProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    const p = await fetchProfile(userId);
    if (p && !isProfileActive(p)) {
      if (supabase) await supabase.auth.signOut();
      setProfile(null);
      setUser(null);
      setSession(null);
      return null;
    }
    setProfile(p);
    return p;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await applyProfile(user.id);
  }, [user, applyProfile]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        await applyProfile(data.session.user.id);
      }
      setLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        // Ne pas await ici : bloque signInWithPassword (deadlock Supabase)
        void applyProfile(newSession.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [applyProfile]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) return { error: CONFIG_ERROR };

      const normalizedEmail = email.trim().toLowerCase();

      const attemptSignIn = async () => {
        return supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
      };

      let { data, error } = await attemptSignIn();

      const needsConfirm =
        error &&
        (error.message.toLowerCase().includes('email not confirmed') ||
          error.message.toLowerCase().includes('email_not_confirmed'));

      if (needsConfirm && import.meta.env.DEV) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);
          await fetch('/api/confirm-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: normalizedEmail }),
            signal: controller.signal,
          });
          clearTimeout(timeout);
          ({ data, error } = await attemptSignIn());
        } catch {
          return {
            error:
              'Activation du compte impossible. Exécutez supabase/confirm_users_email.sql dans Supabase.',
          };
        }
      }

      if (error) return { error: mapAuthError(error.message) };
      if (!data.session?.user) {
        return { error: 'Connexion échouée. Réessayez.' };
      }

      setSession(data.session);
      setUser(data.user);
      const p = await fetchProfile(data.user.id);

      if (!p) {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setProfile(null);
        return {
          error:
            'Compte connecté mais profil introuvable. Vérifiez la table profiles (trigger ou setup_complet.sql).',
        };
      }

      if (!isProfileActive(p)) {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setProfile(null);
        return { error: ACCOUNT_DISABLED_MESSAGE };
      }

      setProfile(p);
      return { error: null, role: p.role };
    },
    []
  );

  const signUp = useCallback(
    async (email: string, password: string, fullName: string, securityAnswers: string[]) => {
      if (!supabase) return { error: CONFIG_ERROR };

      const normalizedEmail = email.trim().toLowerCase();
      const result = await registerAccount(
        normalizedEmail,
        password,
        fullName,
        securityAnswers
      );

      if ('error' in result) {
        return { error: mapAuthError(result.error) };
      }

      const signInResult = await signIn(normalizedEmail, password);
      if (signInResult.error) return signInResult;

      const saveResult = await saveSecurityAnswers(securityAnswers);
      if (saveResult.error) {
        return { error: mapAuthError(saveResult.error) };
      }

      return { error: null };
    },
    [signIn]
  );

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    setProfile(null);
    setUser(null);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      session,
      profile,
      loading,
      configured,
      signIn,
      signUp,
      signOut,
      refreshProfile,
    }),
    [user, session, profile, loading, configured, signIn, signUp, signOut, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans un AuthProvider');
  return ctx;
}
