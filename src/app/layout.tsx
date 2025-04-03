import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const mayan = localFont({
  src: [
    {
      path: "./fonts/Mayan.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mayan",
})
const Requiem = localFont({
  src: [
    {
      path: './fonts/Requiem.ttf', // Make sure this path is correct!
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-requiem',
});

const modern = localFont({
  src: [
    {
      path: './fonts/ModernAesthetic-DemoVersion-Regular.ttf', // Make sure this path is correct!
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-modern',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EVOGEN 14.0 ",
  description: "EVOGEN 14.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${Requiem.variable} ${modern.variable} ${mayan.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
