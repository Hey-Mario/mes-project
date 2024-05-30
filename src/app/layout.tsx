import '@radix-ui/themes/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  QueryClient,
} from '@tanstack/react-query';
import { AppRoot } from './_root';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MES Project",
  description: "Manufacturing Execution System project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRoot>
            {children}
        </AppRoot>
      </body>
    </html>
  );
}
