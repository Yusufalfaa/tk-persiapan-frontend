"use client";

import { useEffect, useState } from "react";

import { getCurrentUser } from "@/services/auth.service";
import type { CurrentUser } from "@/types/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";


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
        <div>
            <AdminSidebar />
        </div>
    );
}