"use client";

import { useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

import AdminNewsList from "@/components/admin/news/AdminNewsList";
import NewsForm from "@/components/admin/news/NewsForm";

import type { NewsList } from "@/types/news";
import NewsEditor from "@/components/admin/news/NewsEditor";

export default function AdminNewsPage() {
    const [showForm, setShowForm] = useState(false);
    const [selectedNews, setSelectedNews] =
        useState<NewsList | null>(null);

    function handleCreate() {
        setSelectedNews(null);
        setShowForm(true);
    }

    function handleEdit(news: NewsList) {
        setSelectedNews(news);
        setShowForm(true);
    }

    function handleCancel() {
        setSelectedNews(null);
        setShowForm(false);
    }

    function handleSuccess() {
        setSelectedNews(null);
        setShowForm(false);
    }

    return (
        <div className="flex min-h-screen bg-[#F5F2EC]">
            <AdminSidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <AdminHeader
                    title="News"
                    title2="Management"
                />

                <main className="flex-1 p-8">
                    {showForm ? (
                        selectedNews ? (
                            <NewsEditor
                                news={selectedNews}
                                onCancel={handleCancel}
                                onSuccess={handleSuccess}
                            />
                        ) : (
                            <NewsForm
                                news={null}
                                onCancel={handleCancel}
                                onSuccess={handleSuccess}
                            />
                        )
                    ) : (
                        <AdminNewsList
                            onCreate={handleCreate}
                            onEdit={handleEdit}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
