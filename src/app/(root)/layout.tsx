import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

import "../globals.css";
import ClerkVIProvider from "@/lib/providers/ClerkVIProvider";
import { ToasterProvider } from "@/lib/providers/ToasterProvider";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Banner from "@/components/layouts/Banner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Đọc truyện",
  description: "Website đọc truyện online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkVIProvider>
      <html lang="vi" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ToasterProvider />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="max-lg:flex-col w-full relative">
              <Header />
              <Banner />
              <main className="absolute xl:top-[300px] sm:top-[200px] w-full flex justify-center">
                <div className="lg:max-w-screen-xl">{children}</div>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkVIProvider>
  );
}
