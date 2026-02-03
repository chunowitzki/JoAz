import type { Metadata } from "next";
import { Geist, Geist_Mono, Story_Script } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const storyScript = Story_Script({
  subsets: ["latin"],
  weight: ["400"],
})

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  title: "JoAz",
  description: "2026 ideas",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${storyScript.className} antialiased bg-[#A27B5B]`}
      
      >
        
        <div className="mx-auto max-w-97.5 min-h-screen bg-[#A27B5B]">
          <header className="sticky top-0 z-50 bg-[#3F4E4F]">
            <h1 className="text-6xl font-bold text-center p-4">JoAz</h1>
            <NavBar />
          </header>
          <main className="pt-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
