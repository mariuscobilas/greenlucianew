import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Green Lucia | by Swedish Embassy in Chisinau",
    description: "Register now for the Green Lucia event to secure your spot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased ` }
      >
        {children}
      </body>
    </html>
  );
}
