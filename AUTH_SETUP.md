# Google sign-in setup for HiddenRides

The repository now includes a Google-only sign-in page at `/auth.html`. It uses Supabase Auth (managed authentication), Google OAuth, and the PKCE flow. No passwords are collected by HiddenRides.

## Required one-time setup

1. Create or open a project at https://supabase.com/dashboard.
2. In **Project Settings → API** (or **Connect**), copy the project URL and the **publishable/anon** browser key. In `assets/supabase-config.js`, replace:
   - `https://YOUR_PROJECT_REF.supabase.co` with the project URL.
   - `YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY` with the publishable/anon key.
   Never use or expose a `service_role` or secret key in browser code.
3. In Supabase, open **Authentication → Sign In / Providers → Google** and enable Google.
4. In Google Cloud Console, create/select a project, configure the OAuth consent screen, and create an OAuth Client ID of type **Web application**. Add the Supabase callback URL shown in the Supabase Google provider setup (usually `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`) under **Authorized redirect URIs**. Copy the Google Client ID and Client Secret into Supabase's Google provider settings only; do not put the Google client secret in this repository.
5. In Supabase **Authentication → URL Configuration**, set the Site URL to `https://hiddenrides.com` and add these Redirect URLs:
   - `https://hiddenrides.com/**` (covers the profile page and returning to a ride page after Google sign-in)
   - `https://www.hiddenrides.com/**` (only if you use the www hostname)
   Also add your local development URL if needed.
6. Save settings and deploy the GitHub changes to Cloudflare Pages. Open `https://hiddenrides.com/auth.html` and test Google sign-in and sign-out.

## What this implements

- Google OAuth sign-in and returning-user session detection.
- Supabase-managed session persistence and refresh using PKCE.
- Sign-out.
- A homepage **Sign in** link.
- A clear setup message until the Supabase project values are configured.
- A profile page at `/profile.html` that shows the Google account name, email, avatar (when provided), membership date, and saved rides.
- A **Save ride** action on ride guides; saved items are stored in Supabase and are visible to that user on their profile.
- A per-user saved-rides table protected by Row Level Security (RLS).

## Security notes and current scope

- The Supabase publishable/anon key is designed to be public. Never commit a service-role key or Google OAuth client secret.
- Run the SQL in `supabase/saved_rides.sql` in the Supabase SQL Editor. It creates the `saved_rides` table, enables Row Level Security (RLS), and limits each authenticated user to their own records. Do not disable RLS. The profile and Save ride features will not work until this SQL is applied.
- Ride guides remain public. Saving a ride requires a signed-in Google account. The feature stores a ride slug, title, city, URL and timestamp for the signed-in user.
- The Google OAuth consent screen may need to be published/verified for public availability, depending on the scopes and audience you configure.
