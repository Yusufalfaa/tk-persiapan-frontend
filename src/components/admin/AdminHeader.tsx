"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface AdminHeaderProps {
    title: string;
    title2?: string;
}

export default function AdminHeader({
    title,
    title2,
}: AdminHeaderProps) {
    return (
        <header className="flex h-20 items-center justify-between border-b bg-[#FFFDF7] px-8">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#FF6B6B]/80">
                    {title}
                </h1>

                {title2 && (
                    <span className="text-2xl font-bold text-black">
                        {title2}
                    </span>
                )}
            </div>

            <Link
                href="/"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#BF4C4C] bg-[#FF6B6B]/80 px-4 text-sm font-medium text-white transition-colors hover:bg-[#FF6B6B]"
            >
                <ExternalLink className="size-4" />
                Lihat Website
            </Link>
        </header>
    );
}