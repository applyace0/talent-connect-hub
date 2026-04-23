# GitHub to Vercel Connection Guide

## Repository Information

- **GitHub Repository:** `applyace0/talent-connect-hub`
- **GitHub URL:** https://github.com/applyace0/talent-connect-hub
- **GitHub Account:** applyace0
- **Email:** applyace0@gmail.com

## Connecting GitHub to Vercel

### Step 1: Sign in to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account (applyace0)

### Step 2: Import Your Repository

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"talent-connect-hub"** in the list
4. Click **"Import"** next to the repository

### Step 3: Configure Project Settings

#### Framework Preset
- **Framework Preset:** Vite
- Vercel should auto-detect this from your `package.json`

#### Build Settings
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### Root Directory
- Leave as **"."** (root) unless your project is in a subdirectory

### Step 4: Environment Variables

Before deploying, add these environment variables in Vercel:

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variables for **Production**, **Preview**, and **Development**:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_DASHBOARD_PASSWORD=your_secure_admin_password
```

**Important Notes:**
- `SUPABASE_SERVICE_ROLE_KEY` should **NEVER** be exposed to the client
- `ADMIN_DASHBOARD_PASSWORD` should be a strong password
- Set these for all environments (Production, Preview, Development)

### Step 5: Deploy

1. Click **"Deploy"**
2. Vercel will:
   - Clone your repository
   - Install dependencies
   - Build your project
   - Deploy to a production URL

### Step 6: Verify Deployment

After deployment completes:

1. You'll get a deployment URL like: `https://talent-connect-hub-xxxxx.vercel.app`
2. Test the following URLs:
   - Home: `https://your-domain.vercel.app/`
   - Admin Login: `https://your-domain.vercel.app/admin/login`
   - Admin Dashboard: `https://your-domain.vercel.app/admin` (after login)

## Automatic Deployments

Once connected, Vercel will automatically:

- **Deploy on push to `main` branch** → Production deployment
- **Deploy on pull requests** → Preview deployments
- **Redeploy on every commit** to the main branch

## Custom Domain (Optional)

To add a custom domain:

1. Go to **Project Settings** → **Domains**
2. Enter your domain name
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificates

## GitHub Account Details

- **GitHub Username:** applyace0
- **GitHub Email:** applyace0@gmail.com
- **Repository:** applyace0/talent-connect-hub
- **Repository Type:** Public

## Troubleshooting

### Deployment Fails

1. **Check Build Logs:**
   - Go to your deployment → **"View Function Logs"**
   - Look for error messages

2. **Common Issues:**
   - Missing environment variables
   - Build command errors
   - TypeScript errors
   - Missing dependencies

3. **Verify Environment Variables:**
   - Ensure all required variables are set
   - Check that values are correct (no extra spaces)

### API Routes Not Working

1. **Check Function Logs:**
   - Go to **Functions** tab in Vercel dashboard
   - Check logs for `/api/admin/*` routes

2. **Verify Environment Variables:**
   - `SUPABASE_SERVICE_ROLE_KEY` must be set
   - `ADMIN_DASHBOARD_PASSWORD` must be set

3. **Test API Endpoints:**
   - Use Postman or curl to test API routes
   - Include `x-admin-password` header

### Database Migration

Before using the admin panel:

1. Run the migration SQL in Supabase:
   - Go to Supabase SQL Editor
   - Run `migrations/add_seen_columns.sql`
   - This adds `seen` and `seen_at` columns

## Project Structure for Vercel

```
talent-connect-hub/
├── api/                    # Vercel serverless functions
│   └── admin/
│       ├── stats.ts
│       ├── business-leads.ts
│       ├── intern-applications.ts
│       └── mark-seen.ts
├── src/                    # React application
├── public/                 # Static assets
├── vercel.json            # Vercel configuration
├── package.json
└── vite.config.ts
```

## Vercel Configuration

The `vercel.json` file configures:

- **Build output:** `dist` directory
- **Rewrites:** All routes to `index.html` (for React Router)
- **Serverless functions:** Automatically detected from `/api` folder

## Security Checklist

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel (not in code)
- [ ] `ADMIN_DASHBOARD_PASSWORD` is strong and set in Vercel
- [ ] Environment variables are set for all environments
- [ ] Database RLS policies allow anonymous INSERT
- [ ] Service role key is never exposed to client

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check Vercel function logs for API routes
3. Verify all environment variables are set
4. Ensure database migration has been run
5. Check GitHub repository permissions

## Next Steps After Deployment

1. ✅ Run database migration in Supabase
2. ✅ Set environment variables in Vercel
3. ✅ Test admin login at `/admin/login`
4. ✅ Verify API routes are working
5. ✅ Test form submissions
6. ✅ Test admin panel functionality

---

**Last Updated:** 2024
**Repository:** https://github.com/applyace0/talent-connect-hub
**Contact:** applyace0@gmail.com
