create index if not exists idx_links_user_id on links(user_id);
create index if not exists idx_categories_user_id on categories(user_id);
create index if not exists idx_links_category_id on links(category_id);
create index if not exists idx_clicks_link_id on clicks(link_id);
