REVOKE ALL ON FUNCTION public.request_category_summary() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.request_category_summary() FROM anon;
REVOKE ALL ON FUNCTION public.request_category_summary() FROM authenticated;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM anon;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM authenticated;