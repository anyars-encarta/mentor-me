import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "MentorMe",
  description: "A Virtual Mentoring and Coaching System",
  icons: {
    icon: '/assets/icons/logo-icon.png'
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout;
