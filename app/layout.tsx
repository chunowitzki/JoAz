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
        className={`${storyScript.className} antialiased bg-[#2c3639]`}
      
      >
        
        <div className="mx-auto max-w-97.5 min-h-screen bg-[#2c3639]">
          <header className="">
            <h1 className="text-6xl font-bold text-center p-4">JoAz</h1>
            <NavBar />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
