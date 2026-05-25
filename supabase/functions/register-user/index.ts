import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, password, full_name } = await req.json();

    if (!email || typeof email !== 'string') {
      return json({ error: 'Email requis.' }, 400);
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return json({ error: 'Mot de passe requis (6 caractères minimum).' }, 400);
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: email.trim().toLowerCase(),
      password,
      email_confirm: true,
      user_metadata: { full_name: full_name?.trim() || '' },
    });

    if (error) {
      const msg = error.message.includes('already been registered')
        ? 'Un compte existe déjà avec cet email.'
        : error.message;
      return json({ error: msg }, 400);
    }

    return json({ ok: true, user_id: data.user?.id });
  } catch {
    return json({ error: 'Requête invalide.' }, 400);
  }
});

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
