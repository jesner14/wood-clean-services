import { isSupabaseConfigured, supabase } from './supabase';
import type { QuoteRequest, QuoteRequestInput, QuoteRequestStatus } from './types';

export async function submitQuoteRequest(
  input: QuoteRequestInput
): Promise<{ error: string | null }> {
  const payload = {
    full_name: input.fullName.trim(),
    phone: input.phone.trim() || null,
    email: input.email.trim().toLowerCase(),
    service: input.service,
    message: input.message.trim(),
    status: 'new' as const,
  };

  if (supabase && isSupabaseConfigured()) {
    const { error } = await supabase.from('quote_requests').insert(payload);
    if (!error) return { error: null };

    if (!import.meta.env.DEV) {
      return {
        error:
          error.message.includes('quote_requests')
            ? 'Table quote_requests absente. Exécutez supabase/quote_requests.sql dans Supabase.'
            : 'Envoi impossible. Réessayez ou contactez-nous par téléphone.',
      };
    }
  }

  if (import.meta.env.DEV) {
    try {
      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) return { error: data.error ?? 'Envoi impossible.' };
      return { error: null };
    } catch {
      return { error: 'Serveur indisponible. Vérifiez .env.local et quote_requests.sql.' };
    }
  }

  return { error: 'Service de demande de devis indisponible.' };
}

export async function fetchQuoteRequests(): Promise<{
  data: QuoteRequest[];
  error: string | null;
}> {
  if (!supabase) return { data: [], error: 'Supabase non configuré.' };

  const { data, error } = await supabase
    .from('quote_requests')
    .select('id, full_name, phone, email, service, message, status, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return {
      data: [],
      error: error.message.includes('quote_requests')
        ? 'Table quote_requests absente. Exécutez supabase/quote_requests.sql.'
        : error.message,
    };
  }

  return { data: (data ?? []) as QuoteRequest[], error: null };
}

export async function updateQuoteRequestStatus(
  id: string,
  status: QuoteRequestStatus
): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase non configuré.' };

  const { error } = await supabase.from('quote_requests').update({ status }).eq('id', id);

  if (error) return { error: error.message };
  return { error: null };
}
