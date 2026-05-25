import { supabase } from './supabase';

export async function saveSecurityAnswers(answers: string[]): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase non configuré.' };

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return { error: 'Session introuvable après inscription.' };

  if (import.meta.env.DEV) {
    const res = await fetch('/api/security-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ answers }),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!json.ok) return { error: json.error || 'Enregistrement des réponses impossible.' };
    return { error: null };
  }

  const { data, error } = await supabase.functions.invoke('save-security-answers', {
    body: { answers },
    headers: { Authorization: `Bearer ${session.access_token}` },
  });

  const payload = data as { ok?: boolean; error?: string } | null;
  if (error || payload?.error) {
    return { error: payload?.error || error?.message || 'Enregistrement des réponses impossible.' };
  }
  return { error: null };
}

export async function resetPasswordWithSecurityAnswers(
  email: string,
  answers: string[],
  password: string
): Promise<{ error: string | null }> {
  if (import.meta.env.DEV) {
    const res = await fetch('/api/reset-password-security', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase(), answers, password }),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!json.ok) return { error: json.error || 'Réinitialisation impossible.' };
    return { error: null };
  }

  if (!supabase) return { error: 'Supabase non configuré.' };

  const { data, error } = await supabase.functions.invoke('reset-password-security', {
    body: { email: email.trim().toLowerCase(), answers, password },
  });

  const payload = data as { ok?: boolean; error?: string } | null;
  if (error || payload?.error) {
    return { error: payload?.error || error?.message || 'Réinitialisation impossible.' };
  }
  return { error: null };
}
