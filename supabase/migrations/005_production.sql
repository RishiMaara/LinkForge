-- Enable Row Level Security
alter table links enable row level security;
alter table profiles enable row level security;
alter table bio_links enable row level security;

-- Policies for links
create policy "Users manage own links"
on links
for all
using (
 auth.uid() = user_id
);

-- Policies for profiles
create policy "Users manage own profile"
on profiles
for all
using (
 auth.uid() = user_id
);

-- Policies for bio_links
create policy "Users manage own bio links"
on bio_links
for all
using (
 auth.uid() = (
   select user_id
   from profiles
   where profiles.id = bio_links.profile_id
 )
);

-- Custom Domain support
alter table links
add column custom_domain text;
