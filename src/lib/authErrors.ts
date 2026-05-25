export function mapAuthError(message: string): string {
  const lower = message.toLowerCase();

  if (
    (lower.includes('email address') && lower.includes('invalid')) ||
    lower.includes('email_address_invalid')
  ) {
    return (
      'Cette adresse email est refusée par Supabase (format ou domaine non reconnu). ' +
      'Pour tester, utilisez par exemple un @gmail.com ou @outlook.com. ' +
      'Les domaines sans serveur mail configuré (ex. certains .sn) peuvent être bloqués.'
    );
  }

  if (lower.includes('invalid login credentials')) {
    return (
      'Email ou mot de passe incorrect. Utilisez « Mot de passe oublié » ou vérifiez l\'email exact de votre compte dans Supabase.'
    );
  }

  if (lower.includes('email not confirmed') || lower.includes('email_not_confirmed')) {
    return (
      'Ce compte n\'est pas encore activé côté Supabase. ' +
      'Exécutez le script supabase/confirm_users_email.sql ou utilisez « Mot de passe oublié » (questions de sécurité).'
    );
  }

  if (lower.includes('user already registered')) {
    return 'Un compte existe déjà avec cet email. Connectez-vous ou réinitialisez votre mot de passe.';
  }

  if (lower.includes('password') && lower.includes('least')) {
    return 'Le mot de passe doit contenir au moins 6 caractères.';
  }

  if (lower.includes('signups are disabled') || lower.includes('signup is disabled')) {
    return (
      'Les inscriptions par email sont désactivées dans Supabase. ' +
      'Activez-les : Authentication → Providers → Email → « Enable Email provider » et « Allow new users to sign up ».'
    );
  }

  if (lower.includes('rate limit') || lower.includes('too many requests')) {
    return (
      'Trop de tentatives Supabase (souvent après plusieurs inscriptions avec email). ' +
      'Attendez 30–60 minutes sans réessayer, ou créez le compte avec : pnpm create-user email@gmail.com MotDePasse123 "Nom". ' +
      'Redémarrez aussi pnpm dev si vous venez d\'ajouter SUPABASE_SERVICE_ROLE_KEY dans .env.local.'
    );
  }

  return message;
}
