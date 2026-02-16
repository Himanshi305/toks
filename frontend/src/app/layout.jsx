"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../context/user_context";
import ShaderBackground from "./components/ShaderBackground";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/project/");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isProjectPage && <ShaderBackground />}
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
