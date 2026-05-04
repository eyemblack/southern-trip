import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { getFileTree } from "@/lib/markdown";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Travel Planner Viewer",
  description: "A beautiful viewer for your travel plans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tree = getFileTree();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans bg-slate-50 text-slate-900`}>
        <div className="flex min-h-screen">
          <Sidebar tree={tree} />
          <main className="flex-1 lg:pl-72">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
