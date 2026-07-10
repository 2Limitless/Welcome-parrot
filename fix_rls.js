const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://wdvfxvmlavamxpjabeox.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkdmZ4dm1sYXZhbXhwamFiZW94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjY5NDQ0OCwiZXhwIjoyMDk4MjcwNDQ4fQ.pOOA8J3YHEGnLbvjlLmguVK6V9dzThoKAfVJ-Vda5NQ');
async function run() {
  const { data, error } = await supabase.rpc('execute_sql', { sql: "ALTER TABLE messages DISABLE ROW LEVEL SECURITY;" });
  console.log(error);
}
run();
