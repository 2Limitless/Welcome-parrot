import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');
  if (!clientId) return NextResponse.json({ data: [], count: 0 });

  const { data, count, error } = await supabaseAdmin
    .from('messages')
    .select('*', { count: 'exact' })
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("API Error fetching messages:", error);
    return NextResponse.json({ data: [], count: 0 });
  }

  return NextResponse.json({ data, count });
}
