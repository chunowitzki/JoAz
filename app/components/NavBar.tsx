"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "./Modal";
import { supabase } from "@/lib/supabase/client";

const navItems = [
  { href: "/food", emoji: "🍜", label: "Food", category: "Food" },
  { href: "/watchlist", emoji: "📺", label: "Watchlist", category: "Watchlist" },
  { href: "/dates", emoji: "🎆", label: "Dates", category: "Dates" },
  { href: "/notes", emoji: "🧡🩵", label: "Notes", category: "Notes" },
] as const;


export default function NavBar() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("Food");
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);


  return (
    <nav className="fixed left-1/2 -translate-x-1/2 z-50 p-3">
      <div className="flex gap-6">
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
      <div className="flex items-end justify-end pt-10">
        <button className="flex items-center justify-center
              w-14 h-14
              rounded-full
              bg-[#A27b5b]/40
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
                    className="px-4 py-2 rounded-lg bg-gray-200"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-black text-white"
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