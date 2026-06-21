create index idx_slug
on links(slug);

create index idx_user_links
on links(user_id);
