"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminProfile from "@/components/admin/AdminProfile";

export default function AdminProfilePage() {
    return (
        <div className="flex min-h-screen bg-[#F5F2EC]">
            <AdminSidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <AdminHeader
                    title="Admin Control"
                    title2="Profile"
                />

                <main className="flex-1 p-8">
                    <AdminProfile />
                </main>
            </div>
        </div>
    );
}