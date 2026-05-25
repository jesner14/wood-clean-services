import { supabase } from './supabase';

export type AdminDashboardCounts = {
  demandes: number;
  devis: number;
  factures: number;
  clients: number;
};

export async function fetchAdminDashboardCounts(): Promise<{
  counts: AdminDashboardCounts | null;
  error: string | null;
}> {
  if (!supabase) return { counts: null, error: 'Supabase non configuré.' };

  const [demandesRes, devisRes, facturesRes, clientsRes] = await Promise.all([
    supabase.from('quote_requests').select('id', { count: 'exact', head: true }),
    supabase.from('quotes').select('id', { count: 'exact', head: true }),
    supabase.from('invoices').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'client'),
  ]);

  const firstError =
    demandesRes.error?.message ||
    devisRes.error?.message ||
    facturesRes.error?.message ||
    clientsRes.error?.message;

  if (firstError) {
    return { counts: null, error: firstError };
  }

  return {
    counts: {
      demandes: demandesRes.count ?? 0,
      devis: devisRes.count ?? 0,
      factures: facturesRes.count ?? 0,
      clients: clientsRes.count ?? 0,
    },
    error: null,
  };
}
