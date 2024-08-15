import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ReactNode } from "react";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "MentorMe",
  description: "A Virtual Mentoring and Coaching System",
  icons: {
    icon: '/assets/icons/logo-icon.png'
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <ClerkProvider 
      appearance={{
        layout: {
          logoImageUrl: '/assets/icons/logo-icon.png',
          socialButtonsVariant: 'iconButton'
        },
        variables: {
          colorText: '#fff',
          colorPrimary: '#0E78F9',
          colorBackground: '#1c1f2e',
          colorInputBackground: '#252a41',
          colorInputText: '#fff'
        }
      }}
      >
        <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}

export default RootLayout
