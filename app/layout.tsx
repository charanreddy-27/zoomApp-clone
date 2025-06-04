import { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEET HERE",
  description: "Video calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/MEET HERE-logo.svg",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#2563EB",
            colorBackground: "#121826",
            colorInputBackground: "#1E2A45",
            colorInputText: "#fff",
          },
          elements: {
            formButtonPrimary: "shadow-button hover:shadow-lg transition-all duration-300",
            card: "shadow-card",
            formFieldInput: "transition-all duration-300 focus:shadow-soft",
          },
        }}
      >
        <body className={`${inter.className} bg-dark-2 animate-fade-in`}>
          <Toaster />
          <div className="animate-slide-up">
            {children}
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
