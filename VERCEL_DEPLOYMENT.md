# Vercel Deployment Guide for Admin Panel

## Overview

This project uses Vercel serverless functions for the admin API routes. The API routes are located in `/api/admin/` and will automatically be deployed as serverless functions on Vercel.

## Environment Variables

Add these environment variables in your Vercel project settings (Project > Settings > Environment Variables):

### Required Variables

1. **NEXT_PUBLIC_SUPABASE_URL** (or VITE_SUPABASE_URL)
   - Your Supabase project URL
   - Example: `https://xxxxx.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** (or VITE_SUPABASE_ANON_KEY)
   - Your Supabase anonymous key (public, safe for client-side)
   - Found in: Supabase Dashboard > Settings > API

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Your Supabase service role key (server-side only, NEVER expose to client)
   - Found in: Supabase Dashboard > Settings > API > service_role key
   - ⚠️ **CRITICAL**: This bypasses RLS - keep it secret!

4. **ADMIN_DASHBOARD_PASSWORD** (or VITE_ADMIN_DASHBOARD_PASSWORD or NEXT_PUBLIC_ADMIN_DASHBOARD_PASSWORD)
   - Password for admin login
   - Set a strong password
   - This is used to authenticate API requests

### Setting Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add each variable for **Production**, **Preview**, and **Development** environments
4. Click **Save**

## API Routes

The following serverless functions are automatically created:

- `/api/admin/stats` - GET - Dashboard statistics
- `/api/admin/business-leads` - GET - List all business leads
- `/api/admin/intern-applications` - GET - List all intern applications
- `/api/admin/mark-seen` - POST - Mark a lead/application as seen

All API routes require the `x-admin-password` header with the admin password.

## Database Migration

Before using the admin panel, run the database migration:

1. Open your Supabase SQL Editor
2. Run the SQL from `migrations/add_seen_columns.sql`
3. This adds `seen` and `seen_at` columns to both tables

## Local Development

For local development with Vercel serverless functions:

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Link your project:
   ```bash
   vercel link
   ```

3. Pull environment variables:
   ```bash
   vercel env pull .env.local
   ```

4. Run development server:
   ```bash
   vercel dev
   ```

   This will:
   - Start Vite dev server for the frontend
   - Run serverless functions locally for API routes
   - Use your Vercel environment variables

## Deployment

### Automatic Deployment

If connected to GitHub, Vercel automatically deploys on push to main branch.

### Manual Deployment

```bash
vercel --prod
```

## Troubleshooting

### API Routes Return 404

- Ensure your `vercel.json` is in the root directory
- Check that files in `/api/admin/` have `.ts` extension
- Verify the build is successful

### Authentication Errors

- Verify `ADMIN_DASHBOARD_PASSWORD` is set in Vercel environment variables
- Check that the frontend is sending the `x-admin-password` header
- Ensure the password matches in both frontend and backend

### Supabase Errors

- Verify `SUPABASE_SERVICE_ROLE_KEY` is set (not the anon key)
- Check that the service role key has proper permissions
- Ensure database migration has been run

### CORS Issues

- Vercel serverless functions handle CORS automatically
- If issues persist, check the CORS headers in the API route files

## Security Notes

1. **Service Role Key**: Never commit `SUPABASE_SERVICE_ROLE_KEY` to git
2. **Admin Password**: Use a strong password and rotate it regularly
3. **Environment Variables**: Only set in Vercel dashboard, never in code
4. **RLS Policies**: Ensure RLS still allows anonymous INSERT for forms

## Testing

After deployment:

1. Visit `https://your-domain.vercel.app/admin/login`
2. Enter your admin password
3. Verify dashboard loads with statistics
4. Test viewing leads and applications
5. Test marking items as seen

## Support

If you encounter issues:
1. Check Vercel function logs: Project > Functions > [function name] > Logs
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
