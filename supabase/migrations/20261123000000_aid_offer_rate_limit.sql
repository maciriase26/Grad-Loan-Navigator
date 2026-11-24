-- Aid offer upload: per-visitor rate limit.
-- Stores only a salted hash of the visitor's IP, a window start time and a count.
-- No letter data is ever written to the database.

create table if not exists public.aid_offer_rate_limits (
  key_hash     text primary key,
  window_start timestamptz not null default now(),
  hits         integer not null default 0
);

alter table public.aid_offer_rate_limits enable row level security;
-- No policies: only the service role (server) can touch this table.

-- Atomically records one letter. Returns true if the visitor is still under the limit.
create or replace function public.aid_offer_rate_hit(p_key text, p_limit int, p_window_seconds int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hits int;
begin
  insert into public.aid_offer_rate_limits as r (key_hash, window_start, hits)
  values (p_key, now(), 1)
  on conflict (key_hash) do update
    set hits = case
                 when r.window_start < now() - make_interval(secs => p_window_seconds) then 1
                 else r.hits + 1
               end,
        window_start = case
                 when r.window_start < now() - make_interval(secs => p_window_seconds) then now()
                 else r.window_start
               end
  returning hits into v_hits;

  return v_hits <= p_limit;
end;
$$;

revoke all on function public.aid_offer_rate_hit(text, int, int) from public, anon, authenticated;

-- Housekeeping: old rows are useless after their window. Run daily (pg_cron) or ignore.
create or replace function public.aid_offer_rate_cleanup()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.aid_offer_rate_limits where window_start < now() - interval '1 day';
$$;

revoke all on function public.aid_offer_rate_cleanup() from public, anon, authenticated;
