alter table links
add column status text default 'active';

alter table links
add column category text default 'personal';
