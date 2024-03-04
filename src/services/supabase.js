
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vefsgnxzhjndvsfbhvkf.supabase.co';
// eslint-disable-next-line no-undef
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZnNnbnh6aGpuZHZzZmJodmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MzE4MDEsImV4cCI6MjAyNTAwNzgwMX0.eG2zHRMtRSFykmz5c2XOERtI2G3ZBS5lKbXoOZevo0c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;