import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MentorMe",
  description: "A Virtual Mentoring and Coaching System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
