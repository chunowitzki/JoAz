import React from 'react'
import { createClient } from "@supabase/supabase-js";
import Card from '../components/Card';

export const dynamic = "force-dynamic";

const donePage = async () => {

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY in .env.local (project root) and restart `npm run dev`."
    );
  }

 const supabase = createClient(url, key);

 const { data, error } = await supabase
  .from('data')
  .select('*')
  .eq('is_done', true)

if (error) {
  console.error('Error fetching data:', error)
} else {
  console.log('Completed items:', data)
}

  return (
    <main className="px-4 py-2 sm:p-6 max-w-xl mx-auto">
      <ul className="space-y-3">
        {data?.map((item) => (
          <li key={item.id} className="border rounded-xl p-4">
            <Card text={item.title} id={item.id} isDone={item.is_done}/>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default donePage