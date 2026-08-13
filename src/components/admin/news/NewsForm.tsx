"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { NewsList } from "@/types/news";
import { createNews, updateNews } from "@/services/news.service";

interface Props {
    news: NewsList | null;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function NewsForm({
    news,
    onCancel,
    onSuccess,
}: Props) {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (news) {
            setTitle(news.title);
        } else {
            setTitle("");
        }
    }, [news]);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!title.trim()) {
            toast.error("Judul belum diisi");
            return;
        }

        try {
            setLoading(true);

            if (news) {
                await updateNews(news.id, {
                    title: title.trim(),
                });

                toast.success("Berita berhasil diperbarui", {
                    description:
                        "Judul berita berhasil diperbarui.",
                });
            } else {
                await createNews({
                    title: title.trim(),
                });

                toast.success("Berita berhasil ditambahkan", {
                    description:
                        "Berita berhasil dibuat.",
                });
            }

            onSuccess();
        } catch (error) {
            console.error(
                news
                    ? "Failed to update news:"
                    : "Failed to create news:",
                error
            );

            toast.error(
                news
                    ? "Gagal memperbarui berita"
                    : "Gagal menambahkan berita",
                {
                    description:
                        "Terjadi kesalahan saat menyimpan berita.",
                }
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="border-0 bg-[#FFFDF7]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-black">
                    {news
                        ? "Edit Berita"
                        : "Tambah Berita"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* Judul */}
                    <div className="space-y-2">
                        <Label htmlFor="news-title">
                            Judul Berita
                        </Label>

                        <Input
                            id="news-title"
                            value={title}
                            onChange={(event) =>
                                setTitle(
                                    event.target.value
                                )
                            }
                            placeholder="Contoh: Kegiatan Outing Class TK Persiapan"
                            disabled={loading}
                            className="bg-white"
                        />

                        <p className="text-sm text-black/40">
                            Judul berita akan digunakan
                            sebagai judul utama artikel.
                        </p>
                    </div>

                    {/* Action */}
                    <div className="flex justify-end gap-3 border-t border-black/10 pt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={loading}
                            onClick={onCancel}
                            className="cursor-pointer"
                        >
                            Batal
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                        >
                            {loading
                                ? "Menyimpan..."
                                : news
                                  ? "Update Berita"
                                  : "Simpan Berita"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
