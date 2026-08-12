"use client";

import { useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTeacherList from "@/components/admin/AdminTeacherList";
import TeacherForm from "@/components/admin/teacher/TeacherForm";
import type { Teacher } from "@/types/teacher";

export default function AdminTeachersPage() {
    const [showForm, setShowForm] = useState(false);
    const [selectedTeacher, setSelectedTeacher] =
        useState<Teacher | null>(null);

    function handleCreate() {
        setSelectedTeacher(null);
        setShowForm(true);
    }

    function handleEdit(teacher: Teacher) {
        setSelectedTeacher(teacher);
        setShowForm(true);
    }

    function handleCancel() {
        setSelectedTeacher(null);
        setShowForm(false);
    }

    function handleSuccess() {
        setSelectedTeacher(null);
        setShowForm(false);
    }

    return (
        <div className="flex min-h-screen bg-[#F5F2EC]">
            <AdminSidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <AdminHeader
                    title="Teacher"
                    title2="Management"
                />

                <main className="flex-1 p-8">
                    {showForm ? (
                        <TeacherForm
                            teacher={selectedTeacher}
                            onCancel={handleCancel}
                            onSuccess={handleSuccess}
                        />
                    ) : (
                        <AdminTeacherList
                            onCreate={handleCreate}
                            onEdit={handleEdit}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}