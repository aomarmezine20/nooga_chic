# 🚀 Guide de Déploiement Nooga Chic

Ce projet est configuré pour un déploiement automatisé sur **Vercel** avec une base de données **Supabase**.

## 1. Création de la base de données (Supabase)
1. Allez sur [Supabase](https://supabase.com/) et créez un nouveau projet.
2. Une fois le projet prêt, allez dans **Project Settings > Database**.
3. Copiez la **Connection String** sous l'onglet "URI" (format `postgresql://...`).
   - Assurez-vous d'avoir le mot de passe de votre base de données.

## 2. Configuration sur Vercel
1. Sur Vercel, allez dans les **Settings** de votre projet.
2. Allez dans **Environment Variables**.
3. Ajoutez les variables suivantes :
   - `DATABASE_URL` : Votre lien Supabase PostgreSQL URI.
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` : Votre numéro WhatsApp (ex: `+212600000000`).
   - `NEXT_PUBLIC_STORE_NAME` : `Nooga Chic`.
   - `NEXTAUTH_SECRET` : Une chaîne aléatoire longue pour la sécurité.

## 3. Automatisation du Build
Le projet contient un script de build personnalisé dans `package.json` :
`"build": "prisma generate && prisma db push --accept-data-loss && prisma db seed && next build"`

**À chaque "Push" sur GitHub :**
- Vercel génère le client Prisma.
- Vercel synchronise automatiquement votre base Supabase avec les modèles (Products, Admin, etc.).
- Vercel **importe automatiquement vos produits initiaux** et votre compte Admin dans la base.

## 4. Accès Admin
Une fois déployé :
- Allez sur `/admin/login`.
- **Email** : `admin@noogachic.com`
- **Mot de passe** : `Larlanco12face@@**` (modifiable dans `prisma/seed.ts` avant le déploiement).

## 🛠️ Résolution de problèmes
Si le graphique ou les statistiques affichent une erreur :
1. Vérifiez que la variable `DATABASE_URL` est correcte sur Vercel.
2. Regardez les logs de déploiement (onglet "Deployments" sur Vercel) pour voir si le `prisma db seed` a réussi.
