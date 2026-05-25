import { supabase } from './supabase';

type RegisterResult = { ok: true } | { error: string };

export async function registerAccount(
  email: string,
  password: string,
  fullName: string,
  securityAnswers?: string[]
): Promise<RegisterResult> {
  if (!supabase) {
    return { error: 'Supabase non configuré.' };
  }

  const body = {
    email,
    password,
    full_name: fullName,
    ...(securityAnswers?.length === 3 ? { answers: securityAnswers } : {}),
  };

  const { data: fnData, error: fnError } = await supabase.functions.invoke('register-user', {
    body,
  });

  const fnPayload = fnData as { error?: string; ok?: boolean } | null;
  if (fnPayload?.ok) return { ok: true };
  if (fnPayload?.error) return { error: fnPayload.error };

  if (import.meta.env.DEV) {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (json.ok) return { ok: true };
      return {
        error:
          json.error ||
          'Inscription locale impossible. Ajoutez SUPABASE_SERVICE_ROLE_KEY dans .env.local et redémarrez pnpm dev.',
      };
    } catch {
      return {
        error:
          fnError?.message ||
          'Inscription locale impossible. Vérifiez .env.local (SUPABASE_SERVICE_ROLE_KEY) et redémarrez pnpm dev.',
      };
    }
  }

  return {
    error:
      fnError?.message ||
      'Inscription indisponible. Déployez la fonction register-user : supabase functions deploy register-user',
  };
}
