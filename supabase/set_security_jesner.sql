-- Réponses de sécurité pour jesner.landa@gmail.com
-- UID : 4bccde5a-2b54-4337-9989-839b089d6526 (voir Authentication → Users)
-- Réponses : eyone | dakar | 761666938
--
-- Prérequis : table user_security_answers créée (voir user_security_answers.sql)
-- Extension pour hasher les réponses (comme le site, pas en clair)

create extension if not exists pgcrypto;

insert into public.user_security_answers (
  user_id,
  answer_1_hash,
  answer_2_hash,
  answer_3_hash
)
values (
  '4bccde5a-2b54-4337-9989-839b089d6526',
  crypt(lower(trim('eyone')), gen_salt('bf')),
  crypt(lower(trim('dakar')), gen_salt('bf')),
  crypt(lower(trim('761666938')), gen_salt('bf'))
)
on conflict (user_id) do update set
  answer_1_hash = excluded.answer_1_hash,
  answer_2_hash = excluded.answer_2_hash,
  answer_3_hash = excluded.answer_3_hash,
  updated_at = timezone('utc'::text, now());

-- Vérification (une ligne attendue, pas les réponses en clair)
select user_id, created_at, updated_at
from public.user_security_answers
where user_id = '4bccde5a-2b54-4337-9989-839b089d6526';
