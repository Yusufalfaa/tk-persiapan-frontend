"use client";

import { useEffect, useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SchoolProfile from "@/components/admin/school/SchoolProfile";
import SchoolForm from "@/components/admin/school/SchoolForm";

import { getSchool } from "@/services/school.service";
import type { School } from "@/types/school";

export default function AdminSchoolPage() {
    const [school, setSchool] = useState<School | null>(null);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    async function loadSchool() {
        try {
            setLoading(true);

            const data = await getSchool();

            setSchool(data);
        } catch (error) {
            console.error(
                "Failed to load school:",
                error
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSchool();
    }, []);

    function handleSuccess(updatedSchool: School) {
        setSchool(updatedSchool);
        setEditing(false);
    }

    return (
        <div className="flex min-h-screen bg-[#F5F2EC]">
            <AdminSidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <AdminHeader
                    title="Profil"
                    title2="Sekolah"
                />

                <main className="flex-1 p-8">
                    {loading ? (
                        <div className="py-10 text-center text-black/50">
                            Memuat profil sekolah...
                        </div>
                    ) : school === null ? (
                        <div className="py-10 text-center text-black/50">
                            Profil sekolah tidak ditemukan.
                        </div>
                    ) : editing ? (
                        <SchoolForm
                            school={school}
                            onCancel={() =>
                                setEditing(false)
                            }
                            onSuccess={handleSuccess}
                        />
                    ) : (
                        <SchoolProfile
                            school={school}
                            onEdit={() =>
                                setEditing(true)
                            }
                        />
                    )}
                </main>
            </div>
        </div>
    );
}