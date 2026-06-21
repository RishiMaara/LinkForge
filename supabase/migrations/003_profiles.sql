create table profiles (
  id uuid primary key default gen_random_uuid(),

  user_id uuid unique references users(id),

  username text unique not null,

  display_name text,

  headline text,

  bio text,

  avatar_url text,

  website text,

  github text,

  linkedin text,

  resume_url text,

  created_at timestamptz default now()
);

create table bio_links (
  id uuid primary key default gen_random_uuid(),

  profile_id uuid references profiles(id),

  title text not null,

  url text not null,

  sort_order integer default 0,

  created_at timestamptz default now()
);
