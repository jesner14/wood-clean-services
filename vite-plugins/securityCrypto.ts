import bcrypt from 'bcryptjs';
import { normalizeSecurityAnswer } from '../src/lib/securityQuestions';

const ROUNDS = 10;

export async function hashAnswers(answers: string[]): Promise<[string, string, string]> {
  const normalized = answers.map(normalizeSecurityAnswer);
  return Promise.all([
    bcrypt.hash(normalized[0], ROUNDS),
    bcrypt.hash(normalized[1], ROUNDS),
    bcrypt.hash(normalized[2], ROUNDS),
  ]) as Promise<[string, string, string]>;
}

export async function verifyAnswers(
  answers: string[],
  hashes: { answer_1_hash: string; answer_2_hash: string; answer_3_hash: string }
): Promise<boolean> {
  const normalized = answers.map(normalizeSecurityAnswer);
  const checks = await Promise.all([
    bcrypt.compare(normalized[0], hashes.answer_1_hash),
    bcrypt.compare(normalized[1], hashes.answer_2_hash),
    bcrypt.compare(normalized[2], hashes.answer_3_hash),
  ]);
  return checks.every(Boolean);
}
