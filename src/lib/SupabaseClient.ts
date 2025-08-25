// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const getEnv = (name: string, fallback?: string | undefined): string | undefined => {
  // 1) Server / Node environment (process.env)
  if (typeof process !== 'undefined' && typeof process.env !== 'undefined' && process.env[name]) {
    return process.env[name] as string;
  }

  // 2) Vite / bundler environment (import.meta.env) — wrap in try/catch to avoid runtime errors in Node
  try {
    // import.meta may not exist in some runtimes; accessing it directly can throw in older environments
    const meta = (import.meta as any);
    if (meta && meta.env && meta.env[name]) {
      return meta.env[name] as string;
    }
  } catch (e) {
    // ignore - import.meta not available
  }

  return fallback;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Warning: Supabase URL or ANON key is missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

export const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');

// Admin client with service role key (for server-side operations)
export const createAdminClient = () => {
  const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = getEnv('SUPABASE_URL') || SUPABASE_URL;

  if (!serviceRoleKey) {
    throw new Error('Missing Supabase service role key (SUPABASE_SERVICE_ROLE_KEY). Set it in your server environment.');
  }
  if (!url) {
    throw new Error('Missing Supabase URL (SUPABASE_URL). Set it in environment.');
  }

  return createClient(url, serviceRoleKey);
};
