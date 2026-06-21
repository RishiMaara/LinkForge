export interface Link {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  destination_url: string;
  password: string | null;
  expires_at: string | null;
  one_time: boolean;
  is_active: boolean;
  clicks: number;
  last_clicked_at: string | null;
  category: string;
  created_at: string;
}

export interface Click {
  id: string;
  link_id: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  os: string;
  referrer: string;
  visited_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  headline: string;
  bio: string;
  avatar_url: string;
  created_at: string;
}

export interface BioLink {
  id: string;
  profile_id: string;
  title: string;
  url: string;
  sort_order: number;
  created_at: string;
}
