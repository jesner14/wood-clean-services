import { supabase } from './supabase';
import type { Profile } from './types';

export async function fetchClientProfiles(): Promise<{
  data: Profile[];
  error: string | null;
}> {
  if (!supabase) return { data: [], error: 'Supabase non configuré.' };

  const { data, error } = await supabase
    .from('profiles')
    .select('id, role, email, full_name, is_active, created_at')
    .eq('role', 'client')
    .order('created_at', { ascending: false });

  if (error) {
    return {
      data: [],
      error: error.message.includes('permission')
        ? 'Accès refusé. Vérifiez que votre compte a le rôle admin.'
        : error.message,
    };
  }

  return { data: (data ?? []) as Profile[], error: null };
}

export async function setClientActive(
  clientId: string,
  isActive: boolean
): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase non configuré.' };

  const { error } = await supabase
    .from('profiles')
    .update({ is_active: isActive })
    .eq('id', clientId)
    .eq('role', 'client');

  if (error) {
    return {
      error: error.message.includes('is_active')
        ? 'Colonne is_active absente. Exécutez supabase/profiles_is_active.sql.'
        : error.message,
    };
  }

  return { error: null };
}
