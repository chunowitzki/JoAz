import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Card from "../components/Card";

export const dynamic = "force-dynamic";

const allowedCategories = ["Food", "Watchlist", "Dates", "Notes"];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
    const { category: categoryParam } = await params;

    const category = 
    categoryParam.charAt(0).toUpperCase() +
    categoryParam.slice(1);

  if (!allowedCategories.includes(category)) {
    notFound();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY in .env.local (project root) and restart `npm run dev`."
    );
  }

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("data")
    .select("id, title, category, created_at, is_done")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{category}</h1>
        <pre className="whitespace-pre-wrap break-words text-red-600">
          {error.message}
        </pre>
      </main>
    );
  }


  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{category}</h1>

      <ul className="space-y-2">
        {data?.map((item) => (
          <li key={item.id} className="border rounded-xl p-3">
            <Card text={item.title} id={item.id} isDone={item.is_done}/>
          </li>
        ))}
      </ul>
    </main>
  );
}