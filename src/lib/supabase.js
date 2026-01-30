import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://raybshkhzqxhnxfsnkso.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJheWJzaGtoenF4aG54ZnNua3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMjg1NjYsImV4cCI6MjA4NDcwNDU2Nn0.c-A7IRNtiLIZz7GmXQTNKewSjIP16C3qTY1daSU9bZo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
