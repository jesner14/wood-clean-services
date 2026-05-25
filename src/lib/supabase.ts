import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? '';

const PLACEHOLDERS = ['VOTRE_URL_SUPABASE', 'VOTRE_CLE_ANON_SUPABASE', 'votre_cle_anon'];

export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (PLACEHOLDERS.some((p) => supabaseUrl.includes(p) || supabaseAnonKey.includes(p))) {
    return false;
  }
  try {
    const url = new URL(supabaseUrl);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function createSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createSupabaseClient();
