import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Nooga Chic",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
