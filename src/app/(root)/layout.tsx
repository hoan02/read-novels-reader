import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkLoaded } from "@clerk/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Banner from "@/components/layouts/Banner";
import ClerkVIProvider from "@/lib/providers/ClerkVIProvider";
import { ToasterProvider } from "@/lib/providers/ToasterProvider";
import TanstackQueryProvider from "@/lib/providers/TanstackQueryProvider";
import CustomThemeProvider from "@/lib/providers/CustomThemeProvider";
import "../globals.css";

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
    <ClerkVIProvider>
      <TanstackQueryProvider>
        <AppRouterCacheProvider>
          <CustomThemeProvider>
            <html
              lang="vi"
              suppressHydrationWarning
              className="overflow-y-scroll scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-200"
            >
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4651272415173333"
                crossOrigin="anonymous"
              />
              <meta
                name="google-adsense-account"
                content="ca-pub-4651272415173333"
              />
              <body className={inter.className}>
                <ClerkLoaded>
                  <div className="max-lg:flex-col w-full relative">
                    <Header />
                    <div className="hidden lg:block">
                      <Banner />
                    </div>
                    <main className="max-w-7xl mx-auto lg:p-4 p-1 relative lg:top-52">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </ClerkLoaded>
                <ToasterProvider />
              </body>
            </html>
          </CustomThemeProvider>
        </AppRouterCacheProvider>
      </TanstackQueryProvider>
    </ClerkVIProvider>
  );
}
