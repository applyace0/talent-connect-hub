# Admin Panel Features

## Overview

The admin panel provides a secure interface for managing business leads and intern applications with real-time notifications and comprehensive management tools.

## Routes

### `/admin/login`
- Simple password-based authentication
- Password stored in `ADMIN_DASHBOARD_PASSWORD` environment variable
- Sets `admin_authed = "true"` in localStorage on successful login
- Redirects to `/admin` dashboard

### `/admin` (Dashboard)
- **Protected Route**: Requires authentication
- **Features**:
  - Overview cards showing:
    - Total business leads
    - New business leads (unseen)
    - Total intern applications
    - New intern applications (unseen)
  - Quick navigation links to leads and applications pages
  - Real-time statistics updates

### `/admin/leads` (Business Leads)
- **Protected Route**: Requires authentication
- **Features**:
  - Table view with columns:
    - Created date/time
    - Company name
    - Contact name
    - Email
    - Seen status (badge)
  - **Filters**:
    - All leads
    - New only (unseen)
  - **Search**: Filter by company name, contact name, or email
  - **Actions**:
    - Mark as seen (for unseen leads)
    - Export to CSV
  - **Real-time**: Toast notifications when new leads arrive
  - **Browser Notifications**: Optional desktop notifications (with permission)

### `/admin/interns` (Intern Applications)
- **Protected Route**: Requires authentication
- **Features**:
  - Table view with columns:
    - Created date/time
    - Full name
    - Email
    - Area of interest
    - Seen status (badge)
  - **Filters**:
    - All applications
    - New only (unseen)
  - **Search**: Filter by name, email, or area of interest
  - **Actions**:
    - Mark as seen (for unseen applications)
    - Export to CSV
  - **Real-time**: Toast notifications when new applications arrive
  - **Browser Notifications**: Optional desktop notifications (with permission)

## Authentication

- **Method**: Password-based (stored in environment variable)
- **Session**: localStorage (`admin_authed = "true"`)
- **Protection**: All `/admin/*` routes check authentication
- **Logout**: Clears localStorage and redirects to login

## API Endpoints

All endpoints require the `x-admin-password` header and use the service role key server-side.

### `GET /api/admin/stats`
Returns dashboard statistics:
```json
{
  "totalBusinessLeads": 10,
  "newBusinessLeads": 3,
  "totalInternApplications": 25,
  "newInternApplications": 5
}
```

### `GET /api/admin/business-leads`
Returns all business leads ordered by creation date (newest first).

### `GET /api/admin/intern-applications`
Returns all intern applications ordered by creation date (newest first).

### `POST /api/admin/mark-seen`
Marks a lead or application as seen.

**Request Body:**
```json
{
  "table": "business_leads" | "intern_applications",
  "id": "uuid"
}
```

**Response:**
```json
{
  "success": true
}
```

## Database Schema

Both `business_leads` and `intern_applications` tables include:

- `seen` (boolean, default: false) - Whether the item has been viewed
- `seen_at` (timestamptz, nullable) - Timestamp when marked as seen

## Security

1. **Service Role Key**: Only used server-side, never exposed to client
2. **RLS Policies**: Anonymous users can INSERT, but admin reading uses service role key
3. **Password Protection**: Admin password required for all API endpoints
4. **Client-side Auth**: Simple localStorage check (consider upgrading for production)

## Real-time Features

- Supabase Realtime subscriptions for INSERT events
- Toast notifications for new leads/applications
- Browser notifications (with user permission)
- Automatic data refresh on new items

## Export Functionality

- CSV export for business leads
- CSV export for intern applications
- Includes all visible columns
- Filename includes date stamp
