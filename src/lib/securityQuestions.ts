/** Questions de sécurité (fixes pour tous les comptes). */
export const SECURITY_QUESTIONS = [
  'Nom de votre établissement ?',
  'Ville principale d\'activité ?',
  'Numéro de téléphone professionnel (chiffres uniquement) ?',
] as const;

export const SECURITY_ANSWERS_COUNT = SECURITY_QUESTIONS.length;

/** Normalise une réponse avant hash / comparaison. */
export function normalizeSecurityAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\s+/g, ' ');
}

export function validateSecurityAnswers(answers: string[]): string | null {
  if (answers.length !== SECURITY_ANSWERS_COUNT) {
    return 'Les trois questions de sécurité sont obligatoires.';
  }
  for (let i = 0; i < answers.length; i++) {
    if (!normalizeSecurityAnswer(answers[i])) {
      return `Réponse manquante pour la question ${i + 1}.`;
    }
  }
  return null;
}
