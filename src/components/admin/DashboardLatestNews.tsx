"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { getAdminNews } from "@/services/news.service";
import type { NewsList } from "@/types/news";

export default function DashboardLatestNews() {
    const [news, setNews] = useState<NewsList[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadLatestNews() {
            try {
                const response = await getAdminNews(1, 5);

                setNews(response.data);
            } catch (error) {
                console.error(
                    "Failed to load latest news:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadLatestNews();
    }, []);

    return (
        <Card className="mt-8 border-0 bg-[#FFFDF7]">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                    Berita Terbaru
                </CardTitle>

                <Link
                    href="/admin/news"
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium text-[#FF6B6B]/80 transition-colors hover:bg-accent hover:text-[#FF6B6B]"
                >
                    Lihat Semua
                    <ArrowRight className="size-4" />
                </Link>
            </CardHeader>

            <CardContent>
                {loading ? (
                    <div className="py-8 text-center text-muted-foreground">
                        Memuat berita...
                    </div>
                ) : news.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                        Belum ada berita.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="px-4 py-3 font-medium">
                                        Judul
                                    </th>

                                    <th className="px-4 py-3 font-medium">
                                        Tanggal
                                    </th>

                                    <th className="px-4 py-3 font-medium">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {news.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b last:border-0"
                                    >
                                        <td className="px-4 py-4 font-medium">
                                            {item.title}
                                        </td>

                                        <td className="px-4 py-4 text-sm text-muted-foreground">
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleDateString(
                                                "id-ID"
                                            )}
                                        </td>

                                        <td className="px-4 py-4">
                                            <span>
                                                {item.isPublished
                                                    ? "Published"
                                                    : "Draft"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}