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
