# Admin Panel Setup Guide

This guide will help you set up the admin panel for the Talent Connect Hub application.

## Prerequisites

- Node.js installed
- Supabase project set up
- Access to Supabase SQL editor

## Step 1: Database Migration

Run the migration SQL to add the `seen` and `seen_at` columns to both tables:

1. Open your Supabase dashboard
2. Go to SQL Editor
3. Run the SQL from `migrations/add_seen_columns.sql`

This will add:
- `seen` (boolean, default false) - tracks if a lead/application has been viewed
- `seen_at` (timestamptz, nullable) - timestamp when it was marked as seen

**Important**: Ensure RLS policies still allow anonymous INSERT operations for both tables.

## Step 2: Environment Variables

Create a `.env.local` file in the root directory (or add to your existing `.env` file):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase Service Role Key (SERVER-SIDE ONLY)
# Get this from: Supabase Dashboard > Settings > API > service_role key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Dashboard Password
# Set a strong password for admin access
ADMIN_DASHBOARD_PASSWORD=your_secure_admin_password_here

# Server Port (optional, defaults to 3001)
PORT=3001
```

### For Vite Compatibility

If using Vite environment variables, you can also use:

```env
VITE_ADMIN_DASHBOARD_PASSWORD=your_secure_admin_password_here
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Install Dependencies

Install the server dependencies:

```bash
cd server
npm install
cd ..
```

Install the main project dependencies (if not already done):

```bash
npm install
```

## Step 4: Start the Development Servers

You have two options:

### Option A: Run Both Servers Separately

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (API Server):
```bash
npm run dev:server
```

### Option B: Run Both Together (Recommended)

```bash
npm run dev:all
```

This uses `concurrently` to run both servers simultaneously.

## Step 5: Access the Admin Panel

1. Navigate to `http://localhost:8080/admin/login`
2. Enter the password you set in `ADMIN_DASHBOARD_PASSWORD`
3. You'll be redirected to the admin dashboard

## Admin Routes

- `/admin/login` - Login page
- `/admin` - Dashboard with statistics
- `/admin/leads` - Business leads management
- `/admin/interns` - Intern applications management

## Features

### Dashboard (`/admin`)
- Overview cards showing total and new leads/applications
- Quick links to leads and applications pages

### Business Leads (`/admin/leads`)
- Table view of all business leads
- Filter: All / New only
- Mark as seen functionality
- Export to CSV
- Real-time notifications for new leads

### Intern Applications (`/admin/interns`)
- Table view of all intern applications
- Filter: All / New only
- Mark as seen functionality
- Export to CSV
- Real-time notifications for new applications

## Security Notes

1. **Service Role Key**: The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS and should NEVER be exposed to the client. It's only used in the Express server.

2. **Admin Password**: Store the admin password securely. In production, consider using environment variables in your hosting platform (Vercel, Netlify, etc.).

3. **Authentication**: Currently uses localStorage for session management. For production, consider implementing proper session management or JWT tokens.

## Production Deployment

### Vercel Deployment

1. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_DASHBOARD_PASSWORD`

2. Deploy the Express server separately (e.g., Railway, Render, or Vercel Serverless Functions)

3. Update the Vite proxy configuration to point to your production API URL

### Alternative: Serverless Functions

For a serverless approach, you can convert the Express routes to Vercel Serverless Functions or similar.

## Troubleshooting

### API calls failing
- Ensure the Express server is running on port 3001
- Check that environment variables are set correctly
- Verify the proxy configuration in `vite.config.ts`

### Authentication issues
- Clear localStorage: `localStorage.removeItem('admin_authed')`
- Verify `ADMIN_DASHBOARD_PASSWORD` matches in both frontend and server

### Database errors
- Ensure migration SQL has been run
- Verify RLS policies allow INSERT for anonymous users
- Check that service role key has proper permissions

## API Endpoints

All endpoints require the `x-admin-password` header:

- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/business-leads` - Get all business leads
- `GET /api/admin/intern-applications` - Get all intern applications
- `POST /api/admin/mark-seen` - Mark a lead/application as seen
  - Body: `{ table: "business_leads" | "intern_applications", id: "uuid" }`
