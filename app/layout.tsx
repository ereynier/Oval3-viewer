import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "./theme-provider";
import { ThemeSwitcher } from "./Components/ThemeSwitcher";
import Footer from "./Components/Footer";
import FeedbackButton from "@/components/FeedbackButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oval3 Viewer",
  description: "View your Oval3 collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full w-full bg-background dark:bg-dot-white/[0.3] bg-dot-black/[0.3] relative flex items-center justify-center">
          <div className="w-full h-full z-10">
            <ThemeProvider attribute='class'>
              {children}
              <div className="absolute top-2 right-5">
                <ThemeSwitcher />
              </div>
              <FeedbackButton className="fixed bottom-2 left-2 z-10" />
              <Footer />
              <Toaster />
            </ThemeProvider>
          </div>
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
      </body>
    </html>
  );
}
