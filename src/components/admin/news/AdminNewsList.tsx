"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
    deleteNews,
    getAdminNews,
} from "@/services/news.service";

import type { NewsList } from "@/types/news";
import { getStorageUrl } from "@/lib/storage-url";

interface Props {
    onCreate: () => void;
    onEdit: (news: NewsList) => void;
}

export default function AdminNewsList({
    onCreate,
    onEdit,
}: Props) {
    const [news, setNews] = useState<NewsList[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [size] = useState(10);

    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [deleteTarget, setDeleteTarget] =
        useState<NewsList | null>(null);

    const [deleting, setDeleting] = useState(false);

    async function loadNews() {
        try {
            setLoading(true);

            const response = await getAdminNews(
                page,
                size
            );

            setNews(response.data);
            setTotal(response.meta.total);
            setTotalPages(response.meta.totalPages);
        } catch (error) {
            console.error(
                "Failed to load news:",
                error
            );

            toast.error("Gagal memuat berita", {
                description:
                    "Terjadi kesalahan saat mengambil data berita.",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadNews();
    }, [page]);

    function handleOpenDelete(news: NewsList) {
        setDeleteTarget(news);
    }

    function handleCloseDelete() {
        if (deleting) {
            return;
        }

        setDeleteTarget(null);
    }

    async function handleDelete() {
        if (!deleteTarget) {
            return;
        }

        try {
            setDeleting(true);

            await deleteNews(deleteTarget.id);

            toast.success("Berita berhasil dihapus", {
                description: `"${deleteTarget.title}" telah dihapus.`,
            });

            setDeleteTarget(null);

            await loadNews();
        } catch (error) {
            console.error(
                "Failed to delete news:",
                error
            );

            toast.error("Gagal menghapus berita", {
                description:
                    "Terjadi kesalahan saat menghapus berita.",
            });
        } finally {
            setDeleting(false);
        }
    }

    return (
        <>
            <Card className="border-0 bg-[#FFFDF7]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-black">
                        Daftar Berita
                    </CardTitle>

                    <Button
                        type="button"
                        onClick={onCreate}
                        className="cursor-pointer gap-2 bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                    >
                        <Plus className="size-4" />
                        Tambah Berita
                    </Button>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div className="py-10 text-center text-black/50">
                            Memuat berita...
                        </div>
                    ) : news.length === 0 ? (
                        <div className="py-10 text-center text-black/50">
                            Belum ada berita.
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-black/10 text-left">
                                            <th className="px-4 py-3 text-sm font-semibold text-black/70">
                                                Thumbnail
                                            </th>

                                            <th className="px-4 py-3 text-sm font-semibold text-black/70">
                                                Judul
                                            </th>

                                            <th className="px-4 py-3 text-sm font-semibold text-black/70">
                                                Author
                                            </th>

                                            <th className="px-4 py-3 text-sm font-semibold text-black/70">
                                                Status
                                            </th>

                                            <th className="px-4 py-3 text-sm font-semibold text-black/70">
                                                Tanggal
                                            </th>

                                            <th className="px-4 py-3 text-right text-sm font-semibold text-black/70">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {news.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-black/5 last:border-0"
                                            >
                                                {/* Thumbnail */}
                                                <td className="px-4 py-4">
                                                    {item.thumbnailUrl ? (
                                                        <img
                                                            src={getStorageUrl(item.thumbnailUrl) ?? ""}
                                                            alt={item.title}
                                                            className="h-14 w-20 rounded-md object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-14 w-20 items-center justify-center rounded-md bg-[#F5F2EC] text-xs text-black/40">
                                                            N/A
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Judul */}
                                                <td className="max-w-[300px] px-4 py-4">
                                                    <p className="font-medium text-black">
                                                        {
                                                            item.title
                                                        }
                                                    </p>

                                                    {item.excerpt && (
                                                        <p className="mt-1 line-clamp-2 text-sm text-black/40">
                                                            {
                                                                item.excerpt
                                                            }
                                                        </p>
                                                    )}
                                                </td>

                                                {/* Author */}
                                                <td className="px-4 py-4 text-black/60">
                                                    {item.author
                                                        ?.name ??
                                                        "-"}
                                                </td>

                                                {/* Status */}
                                                <td className="px-4 py-4">
                                                    <span
                                                        className={
                                                            item.isPublished
                                                                ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                                                                : "rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                                                        }
                                                    >
                                                        {item.isPublished
                                                            ? "Published"
                                                            : "Draft"}
                                                    </span>
                                                </td>

                                                {/* Tanggal */}
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-black/50">
                                                    {new Date(
                                                        item.createdAt
                                                    ).toLocaleDateString(
                                                        "id-ID"
                                                    )}
                                                </td>

                                                {/* Action */}
                                                <td className="px-4 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        {/* Edit */}
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="cursor-pointer text-black/50 hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B]"
                                                            onClick={() =>
                                                                onEdit(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <Pencil className="size-4" />

                                                            <span className="sr-only">
                                                                Edit{" "}
                                                                {
                                                                    item.title
                                                                }
                                                            </span>
                                                        </Button>

                                                        {/* Delete */}
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="cursor-pointer text-black/50 hover:bg-red-50 hover:text-red-500"
                                                            onClick={() =>
                                                                handleOpenDelete(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="size-4" />

                                                            <span className="sr-only">
                                                                Hapus{" "}
                                                                {
                                                                    item.title
                                                                }
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm text-black/50">
                                    Menampilkan{" "}
                                    {news.length} dari{" "}
                                    {total} berita
                                </p>

                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={
                                            page === 1 ||
                                            loading
                                        }
                                        onClick={() =>
                                            setPage(
                                                (current) =>
                                                    current -
                                                    1
                                            )
                                        }
                                        className="cursor-pointer"
                                    >
                                        Sebelumnya
                                    </Button>

                                    <span className="px-2 text-sm text-black/60">
                                        {page} /{" "}
                                        {totalPages}
                                    </span>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={
                                            page >=
                                                totalPages ||
                                            loading
                                        }
                                        onClick={() =>
                                            setPage(
                                                (current) =>
                                                    current +
                                                    1
                                            )
                                        }
                                        className="cursor-pointer"
                                    >
                                        Berikutnya
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation */}
            <AlertDialog
                open={deleteTarget !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        handleCloseDelete();
                    }
                }}
            >
                <AlertDialogContent className="border-0 bg-[#FFFDF7]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">
                            Hapus Berita?
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-black/60">
                            Apakah kamu yakin ingin
                            menghapus{" "}
                            <span className="font-semibold text-black">
                                {deleteTarget?.title}
                            </span>
                            ?
                            <br />
                            Data yang sudah dihapus tidak
                            dapat dikembalikan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={deleting}
                            className="cursor-pointer border-black/10 bg-white text-black hover:bg-[#F5F2EC]"
                        >
                            Batal
                        </AlertDialogCancel>

                        <AlertDialogAction
                            disabled={deleting}
                            className="cursor-pointer bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                            onClick={handleDelete}
                        >
                            {deleting
                                ? "Menghapus..."
                                : "Hapus"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
