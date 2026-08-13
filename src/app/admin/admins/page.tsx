"use client";

import { useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminList from "@/components/admin/admins/AdminList";
import AdminForm from "@/components/admin/admins/AdminForm";

export default function AdminManagementPage() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#F5F2EC]">
            <AdminSidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <AdminHeader
                    title="Pengelolaan"
                    title2="Admin"
                />

                <main className="flex-1 p-8">
                    {showForm ? (
                        <AdminForm
                            onCancel={() =>
                                setShowForm(false)
                            }
                            onSuccess={() =>
                                setShowForm(false)
                            }
                        />
                    ) : (
                        <AdminList
                            onCreate={() =>
                                setShowForm(true)
                            }
                        />
                    )}
                </main>
            </div>
        </div>
    );
}