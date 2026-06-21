alter table links
add column qr_enabled boolean default true;

alter table links
add column is_active boolean default true;

alter table links
add column last_clicked_at timestamptz;
