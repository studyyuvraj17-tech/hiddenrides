-- Run this SQL in Supabase Dashboard → SQL Editor.
-- Each signed-in user can only read, add, and delete their own saved rides.
create table if not exists public.saved_rides (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ride_slug text not null,
  title text not null,
  city text not null default 'India',
  ride_url text not null,
  created_at timestamptz not null default now(),
  constraint saved_rides_user_ride_unique unique (user_id, ride_slug)
);

alter table public.saved_rides enable row level security;

drop policy if exists "Users can read their own saved rides" on public.saved_rides;
create policy "Users can read their own saved rides"
  on public.saved_rides for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can save their own rides" on public.saved_rides;
create policy "Users can save their own rides"
  on public.saved_rides for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can remove their own saved rides" on public.saved_rides;
create policy "Users can remove their own saved rides"
  on public.saved_rides for delete to authenticated
  using ((select auth.uid()) = user_id);

create index if not exists saved_rides_user_created_idx
  on public.saved_rides (user_id, created_at desc);
