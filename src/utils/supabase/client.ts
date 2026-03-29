import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_DATABASE_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_DATABASE_SUPABASE_PUBLISHABLE_KEY;

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
  );
