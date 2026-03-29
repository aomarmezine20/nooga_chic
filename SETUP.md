# NOOGA CHIC - Setup Guide

## Admin Login Credentials

**Email:** admin@noogachic.com  
**Password:** Larlanco12face@@**

Access the admin dashboard at: `/[locale]/admin`  
(e.g., `/en/admin` or `/fr/admin`)

## Database Setup

### 1. Environment Variables

Add `DATABASE_URL` to your Vercel project settings:

```
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
```

This should be your **Supabase PostgreSQL connection string** or **Vercel Postgres URL**.

### 2. Run Database Initialization

After deploying or in development, initialize the database:

```bash
npm run db:init
```

This will:
- Push the Prisma schema to your database
- Create the default admin user
- Set up all tables

### 3. Alternative: Manual Seeding

If you need to seed mock data:

```bash
npm run db:setup
```

## Database Schema

The application uses the following Prisma models:

- **Product** - Store products with multilingual support (FR, EN, AR)
- **ProductVariant** - Manage size/stock combinations
- **Category** - Product categories
- **Interaction** - Track visits and WhatsApp clicks for analytics
- **Admin** - Admin user authentication
- **Settings** - Global store settings

## Build Issues

If you encounter build errors related to Prisma:

1. **Ensure DATABASE_URL is set** in your Vercel project environment variables
2. **API routes use dynamic rendering** - Routes that access the database have `export const dynamic = 'force-dynamic'`
3. **Prisma client is properly initialized** - The db.ts file handles missing DATABASE_URL gracefully

## Deployment Checklist

- [ ] Add `DATABASE_URL` to Vercel project environment variables
- [ ] Run `npm run db:init` after first deployment
- [ ] Verify admin login works at `/en/admin`
- [ ] Test product CRUD operations in admin dashboard
- [ ] Confirm analytics tracking works on homepage

## Troubleshooting

**"PrismaClient needs to be constructed" error during build:**
- Ensure `DATABASE_URL` is set in Vercel environment variables
- All API routes that use Prisma have `dynamic = 'force-dynamic'`

**Admin login page shows but login fails:**
- Check that the database is properly initialized
- Run `npm run db:init` to create the default admin user
- Verify credentials match what's in the database

**Dashboard shows no analytics:**
- Wait for some user interactions (visits/clicks)
- Check browser console for any API errors
- Ensure the analytics API route can access the database
