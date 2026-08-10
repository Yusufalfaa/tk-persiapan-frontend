"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    LayoutDashboard,
    Users,
    Newspaper,
    School,
    UserCircle,
    LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const menuItems = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        label: "Guru",
        href: "/admin/teachers",
        icon: Users,
    },
    {
        label: "Berita",
        href: "/admin/news",
        icon: Newspaper,
    },
    {
        label: "Profil Sekolah",
        href: "/admin/school",
        icon: School,
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-screen w-[360px] shrink-0 flex-col bg-[#1B2235]">
            {/* Logo */}
            <div className="flex h-24 items-center px-8">
                <Link href="/admin">
                    <img
                        src="/images/logo_admin.png"
                        alt="TK Persiapan"
                        width={180}
                        height={60}
                    />
                </Link>
            </div>

            <Separator className="bg-white/10" />

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-6">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex h-12 w-full items-center gap-4
                                rounded-md px-4 text-base
                                transition-colors
                                ${
                                    isActive
                                        ? "bg-[#FF6B6B]/50 text-[#FF6B6B]/80"
                                        : "text-white/50 hover:bg-white/5 hover:text-white/80"
                                }
                            `}
                        >
                            <Icon className="size-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Menu */}
            <div className="p-6">
                <Separator className="mb-4 bg-white/10" />

                <Link
                    href="/admin/profile"
                    className={`
                        flex h-12 w-full items-center gap-4
                        rounded-md px-4 text-base
                        transition-colors
                        ${
                            pathname === "/admin/profile"
                                ? "bg-[#FF6B6B]/50 text-[#FF6B6B]/80"
                                : "text-white/50 hover:bg-white/5 hover:text-white/80"
                        }
                    `}
                >
                    <UserCircle className="size-5" />
                    <span>Akun Saya</span>
                </Link>

                <Button
                    variant="ghost"
                    className="mt-2 h-12 w-full justify-start gap-4 px-4 text-base text-white/50 hover:bg-white/5 hover:text-white/80"
                >
                    <LogOut className="size-5" />
                    <span>Logout</span>
                </Button>
            </div>
        </aside>
    );
}