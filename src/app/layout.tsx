import type { Metadata } from "next";
import {
    Geist,
    Geist_Mono,
    Nunito_Sans,
    DM_Sans,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const dmSansHeading = DM_Sans({
    subsets: ["latin"],
    variable: "--font-heading",
});

const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TK Persiapan",
    description: "Website TK Persiapan",
};

export default function RootLayout({
    children,
}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                geistSans.variable,
                geistMono.variable,
                "font-sans",
                nunitoSans.variable,
                dmSansHeading.variable
            )}
        >
            <body className="flex min-h-full flex-col">
                {children}

                <Toaster
                  position="bottom-right"
                  toastOptions={{
                      unstyled: true,
                      classNames: {
                          toast: "flex w-full items-center gap-3 rounded-lg bg-[#FFFDF7] px-4 py-3 shadow-lg",
                          title: "text-[#FF6B6B] font-semibold",
                          description: "text-black/60",
                          success: "text-[#FF6B6B]",
                          error: "text-[#FF6B6B]",
                      },
                  }}
              />
            </body>
        </html>
    );
}