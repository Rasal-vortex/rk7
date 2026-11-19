-- RK7 public content catalog: tools, construction sites, and event photos.
-- Public visitors can read catalog metadata. Writes remain disabled until
-- Supabase Auth is configured for the single administrator.

begin;

create table public.tools (
  id uuid primary key default gen_random_uuid(),
  image_path text not null,
  name text,
  created_at timestamptz not null default now()
);

create table public.construction_sites (
  id uuid primary key default gen_random_uuid(),
  image_path text not null,
  site_name text,
  description text,
  created_at timestamptz not null default now()
);

create table public.event_photos (
  id uuid primary key default gen_random_uuid(),
  image_path text not null,
  description text,
  created_at timestamptz not null default now()
);

alter table public.tools enable row level security;
alter table public.construction_sites enable row level security;
alter table public.event_photos enable row level security;

revoke all on table public.tools, public.construction_sites, public.event_photos
  from anon, authenticated;
grant select on table public.tools, public.construction_sites, public.event_photos
  to anon, authenticated;

create policy "Public can read tools"
  on public.tools for select to anon, authenticated using (true);
create policy "Public can read construction sites"
  on public.construction_sites for select to anon, authenticated using (true);
create policy "Public can read event photos"
  on public.event_photos for select to anon, authenticated using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'rk7-media',
  'rk7-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

commit;
