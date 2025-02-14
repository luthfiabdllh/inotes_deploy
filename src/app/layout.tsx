"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation"; // Ganti useRouter dengan usePathname
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); 
  const noNavbarRoutes = ["/login", "/register"];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "white" }}
      >
        <SessionProvider >

          {!noNavbarRoutes.includes(pathname) ? (
            <SidebarProvider>
              <AppSidebar />
              {children}
            </SidebarProvider>
          ) : (
            <div>{children}</div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
