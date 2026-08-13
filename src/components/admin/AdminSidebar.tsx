"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import {
    LayoutDashboard,
    Users,
    Newspaper,
    School,
    UserCircle,
    UserCog,
    LogOut,
} from "lucide-react";

import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Separator } from "@/components/ui/separator";

import {
    getCurrentUser,
    logout,
} from "@/services/auth.service";

import type { CurrentUser } from "@/types/auth";

const menuItems = [
    {
        label: "Halaman Utama",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        label: "Data Guru",
        href: "/admin/teachers",
        icon: Users,
    },
    {
        label: "Pengelolaan Berita",
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
    const router = useRouter();

    const [user, setUser] =
        useState<CurrentUser | null>(null);

    useEffect(() => {
        async function loadUser() {
            try {
                const currentUser =
                    await getCurrentUser();

                setUser(currentUser);
            } catch (error) {
                console.error(
                    "Failed to load current user:",
                    error
                );
            }
        }

        loadUser();
    }, []);

    async function handleLogout() {
        try {
            await logout();

            toast.success("Logout berhasil", {
                description:
                    "Kamu telah keluar dari dashboard admin.",
            });

            setTimeout(() => {
                router.replace("/admin/login");
            }, 500);
        } catch (error) {
            console.error(
                "Logout failed:",
                error
            );

            toast.error("Logout gagal", {
                description:
                    "Silakan coba lagi.",
            });
        }
    }

    function isActive(href: string) {
        return pathname === href;
    }

    return (
        <aside className="sticky top-0 flex h-screen w-[360px] shrink-0 flex-col bg-[#1B2235]">
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

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex h-12 w-full items-center gap-4
                                rounded-md px-4 text-base
                                transition-colors
                                ${
                                    isActive(
                                        item.href
                                    )
                                        ? "bg-[#FF6B6B]/50 text-[#FF6B6B]/80"
                                        : "text-white/50 hover:bg-white/5 hover:text-white/80"
                                }
                            `}
                        >
                            <Icon className="size-5" />

                            <span>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}

                {/* Admin Management */}
                {user?.role === "SUPER_ADMIN" && (
                    <Link
                        href="/admin/admins"
                        className={`
                            flex h-12 w-full items-center gap-4
                            rounded-md px-4 text-base
                            transition-colors
                            ${
                                isActive(
                                    "/admin/admins"
                                )
                                    ? "bg-[#FF6B6B]/50 text-[#FF6B6B]/80"
                                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                            }
                        `}
                    >
                        <UserCog className="size-5" />

                        <span>
                            Pengelolaan Admin
                        </span>
                    </Link>
                )}
            </nav>

            {/* Bottom Menu */}
            <div className="p-6">
                <Separator className="mb-4 bg-white/10" />

                {/* Akun Saya */}
                <Link
                    href="/admin/profile"
                    className={`
                        flex h-12 w-full items-center gap-4
                        rounded-md px-4 text-base
                        transition-colors
                        ${
                            isActive(
                                "/admin/profile"
                            )
                                ? "bg-[#FF6B6B]/50 text-[#FF6B6B]/80"
                                : "text-white/50 hover:bg-white/5 hover:text-white/80"
                        }
                    `}
                >
                    <UserCircle className="size-5" />

                    <span>
                        Akun Saya
                    </span>
                </Link>

                {/* Logout */}
                <AlertDialog>
                    <AlertDialogTrigger
                        className="mt-2 flex h-12 w-full cursor-pointer items-center justify-start gap-4 rounded-md px-4 text-base text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
                    >
                        <LogOut className="size-5" />

                        <span>
                            Logout
                        </span>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="border-0 bg-[#FFFDF7]">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-black">
                                Logout dari Admin?
                            </AlertDialogTitle>

                            <AlertDialogDescription className="text-black/60">
                                Apakah kamu yakin
                                ingin keluar dari
                                dashboard admin?
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel
                                className="cursor-pointer bg-[#FFFDF7] text-black hover:bg-[#F5F2EC] hover:text-black"
                            >
                                No
                            </AlertDialogCancel>

                            <AlertDialogAction
                                className="cursor-pointer bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                                onClick={
                                    handleLogout
                                }
                            >
                                Yes
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </aside>
    );
}
