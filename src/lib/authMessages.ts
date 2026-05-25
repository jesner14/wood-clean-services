export const ACCOUNT_DISABLED_MESSAGE =
  'Ce compte a été désactivé par l\'administrateur. Contactez Wood Clean Services si vous pensez qu\'il s\'agit d\'une erreur.';

export function isProfileActive(profile: { role: string; is_active?: boolean }): boolean {
  if (profile.role === 'admin') return true;
  return profile.is_active !== false;
}
