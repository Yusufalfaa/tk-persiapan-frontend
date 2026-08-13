"use client";

import { useEffect, useState } from "react";

import { getCurrentUser } from "@/services/auth.service";
import type { CurrentUser } from "@/types/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import DashboardLatestNews from "@/components/admin/DashboardLatestNews";


export default function AdminPage() {
    const [user, setUser] = useState<CurrentUser | null>(null);

    useEffect(() => {
        async function loadUser() {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch {
                window.location.href = "/admin/login";
            }
        }

        loadUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex min-h-screen bg-[#F5F2EC]">
            <AdminSidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <AdminHeader title="Halaman" title2="Utama" />

               <main className="flex-1 bg-[#F5F2EC] p-8">
                    <DashboardStats />

                    <DashboardLatestNews />
                </main>
            </div>
        </div>
    );
}