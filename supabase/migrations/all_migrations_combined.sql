create extension if not exists pgcrypto;

create table users (
  id uuid primary key,
  email text unique,
  name text,
  avatar_url text,
  created_at timestamptz default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  name text not null
);

create table links (
  id uuid primary key default gen_random_uuid(),

  user_id uuid references users(id),

  title text,

  slug text unique not null,

  destination_url text not null,

  category_id uuid references categories(id),

  password text,

  expires_at timestamptz,

  one_time boolean default false,

  clicks integer default 0,

  created_at timestamptz default now()
);

create table clicks (
  id uuid primary key default gen_random_uuid(),

  link_id uuid references links(id),

  country text,

  city text,

  device text,

  browser text,

  os text,

  referrer text,

  visited_at timestamptz default now(),

  ip_hash text
);
create index idx_clicks_link
on clicks(link_id);

create index idx_clicks_time
on clicks(visited_at);
-- Function to handle new user signups from Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name, avatar_url)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'name', 
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function when a new user signs up
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill any users that might have already logged in before this trigger existed
insert into public.users (id, email)
select id, email from auth.users
on conflict (id) do nothing;
