import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import "../globals.css";
import ClerkVIProvider from "@/lib/providers/ClerkVIProvider";
import { ToasterProvider } from "@/lib/providers/ToasterProvider";
import CustomThemeProvider from "@/lib/providers/CustomThemeProvider";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Banner from "@/components/layouts/Banner";

const inter = Inter({ subsets: ["latin"] });
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
    <html lang="vi" suppressHydrationWarning>
      <SpeedInsights />
      <ClerkVIProvider>
        <AppRouterCacheProvider>
          <CustomThemeProvider>
            <body className={inter.className}>
              <ToasterProvider />
              <div className="max-lg:flex-col w-full relative">
                <Header />
                <Banner />
                <main className="max-w-7xl mx-auto p-4 relative top-52">
                  {children}
                </main>
                <Footer />
              </div>
            </body>
          </CustomThemeProvider>
        </AppRouterCacheProvider>
      </ClerkVIProvider>
    </html>
  );
}
