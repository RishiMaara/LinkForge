create index idx_clicks_link
on clicks(link_id);

create index idx_clicks_time
on clicks(visited_at);
