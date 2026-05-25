# Inscription client (sans email de confirmation)

Le site enregistre email + mot de passe. **Aucun mail** n'est envoyé (pas de `signUp` classique).

## Développement local (recommandé)

Dans `.env.local`, ajoutez la clé **service_role** (Settings → API → service_role secret) :

```env
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Redémarrez `pnpm dev`. L'inscription passe par `/api/register` en local (sans limite d'emails).

## Déployer la fonction `register-user` (une fois)

1. Installez [Supabase CLI](https://supabase.com/docs/guides/cli) si besoin
2. À la racine du projet :

```bash
supabase login
supabase link --project-ref qvcoemtzrpvpsahsjkpb
supabase functions deploy register-user
```

La fonction utilise `SUPABASE_SERVICE_ROLE_KEY` (fournie automatiquement par Supabase).

## Réglages Supabase recommandés

**Authentication** → **Providers** → **Email** :
- **Enable email provider** : ON
- **Allow new users to sign up** (section User Signups) : ON
- **Confirm email** : OFF (secours si la fonction Edge n'est pas déployée)

## Parcours utilisateur

1. `/inscription` — nom, email, mot de passe, confirmation
2. Compte créé et connecté → `/espace-client`
3. `/connexion` — pour les visites suivantes

## Script dev (optionnel)

```bash
pnpm create-user email@exemple.sn MotDePasse123 "Nom"
```

Nécessite `SUPABASE_SERVICE_ROLE_KEY` dans `.env.local`.
