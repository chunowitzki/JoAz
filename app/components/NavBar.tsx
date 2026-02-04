"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "./Modal";
import { supabase } from "@/lib/supabase/client";

const navItems = [
  { href: "/food", emoji: "🍜", label: "Food", category: "Food" },
  { href: "/watchlist", emoji: "📺", label: "Watchlist", category: "Watchlist" },
  { href: "/dates", emoji: "🎆", label: "Dates", category: "Dates" },
  { href: "/notes", emoji: "🧡🩵", label: "Notes", category: "Notes" },
  { href: "/done", emoji: "✔️", label: "Done", category: "Done" },
] as const;


export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("Food");
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <nav className="flex flex-col items-center pb-3">
      <div className="flex gap-5">
        {navItems.map(({ href, emoji, label }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className="
              flex items-center justify-center
              w-14 h-14
              rounded-full
              bg-white/20
              backdrop-blur-xl
              border border-white/30
              shadow-lg
              transition
              hover:bg-white/30
              active:scale-95
            "
          >
            <span className="text-2xl">{emoji}</span>
          </Link>

        ))}

      </div>
      <div className="flex items-center justify-between w-full pt-4 pr-4 pl-7">
        <h4 className="text-2xl font-extrabold items-start">{pathname.slice(1).toLocaleUpperCase()}</h4>
        <button className="flex items-center justify-center
              w-14 h-14
              rounded-full
              bg-[#A27b5b]/30
              backdrop-blur-xl
              border border-white/30
              shadow-lg
              transition
              hover:bg-white/30
              active:scale-95 text-2xl" 
            onClick={() => {
              const match = navItems.find((item) => item.href === pathname);
              setCategory(match?.category ?? "Food");
              setIsModalOpen(true);
            }}
        >
                
                +
        </button>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <form className="w-[320px]" onSubmit={async (e) => {
                e.preventDefault()
                setError(null)

                const { error } = await supabase.from("data").insert([
                    {
                        category, 
                        title,
                        is_done: false
                    }
                ])

                if (error) {
                    setError(error.message)
                    return
                }
                setTitle("");
                setCategory("Food");
                setIsModalOpen(false);
                router.refresh();
                
            }}>
                <h2 className="text-lg font-semibold mb-4">Add new</h2>

                <label className="block text-sm mb-2">
                Category
                <select className="mt-1 w-full rounded-lg border p-2" onChange={(e) => setCategory(e.target.value)} value={category}>
                    {navItems.map((item) => (
                      <option key={item.category} value={item.category}>
                        {item.label}
                      </option>
                    ))}
                </select>
                </label>

                <label className="block text-sm mb-4">
                Title
                <input
                    className="mt-1 w-full rounded-lg border p-2"
                    placeholder="New item..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </label>

                 {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

                <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-[gray-200] border-1"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#3F4E4F] border-1 text-white"
                >
                    Add
                </button>
                </div>
            </form>
        </Modal>
      </div>
    </nav>
  );
}