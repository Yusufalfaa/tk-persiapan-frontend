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
    deleteTeacher,
    getTeachers,
} from "@/services/teacher.service";

import type { Teacher } from "@/types/teacher";

interface AdminTeacherListProps {
    onCreate: () => void;
    onEdit: (teacher: Teacher) => void;
}

export default function AdminTeacherList({
    onCreate,
    onEdit,
}: AdminTeacherListProps) {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [deleteTarget, setDeleteTarget] =
        useState<Teacher | null>(null);

    const [deleting, setDeleting] = useState(false);

    async function loadTeachers() {
        try {
            setLoading(true);

            const response = await getTeachers(
                page,
                size
            );

            setTeachers(response.data);
            setTotalPages(response.meta.totalPages);
            setTotal(response.meta.total);
        } catch (error) {
            console.error(
                "Failed to load teachers:",
                error
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTeachers();
    }, [page]);

    function handleOpenDelete(teacher: Teacher) {
        setDeleteTarget(teacher);
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

            console.log(
                "Deleting teacher:",
                deleteTarget
            );

            await deleteTeacher(deleteTarget.id);

            toast.success("Guru berhasil dihapus", {
                description: `${deleteTarget.name} telah dihapus dari data guru.`,
            });

            setDeleteTarget(null);

            await loadTeachers();
        } catch (error) {
            console.error(
                "Failed to delete teacher:",
                error
            );

            toast.error("Gagal menghapus guru", {
                description:
                    "Terjadi kesalahan saat menghapus data.",
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
                        Data Guru
                    </CardTitle>

                    <Button
                        type="button"
                        onClick={onCreate}
                        className="cursor-pointer gap-2 bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                    >
                        <Plus className="size-4" />
                        Tambah Guru
                    </Button>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div className="py-10 text-center text-black/50">
                            Memuat data guru...
                        </div>
                    ) : teachers.length === 0 ? (
                        <div className="py-10 text-center text-black/50">
                            Belum ada data guru.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-black/10 text-left">
                                        <th className="px-4 py-3 text-sm font-semibold text-black/70">
                                            Foto
                                        </th>

                                        <th className="px-4 py-3 text-sm font-semibold text-black/70">
                                            Nama
                                        </th>

                                        <th className="px-4 py-3 text-sm font-semibold text-black/70">
                                            Jabatan
                                        </th>

                                        <th className="px-4 py-3 text-center text-sm font-semibold text-black/70">
                                            Urutan
                                        </th>

                                        <th className="px-4 py-3 text-right text-sm font-semibold text-black/70">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {teachers.map((teacher) => (
                                        <tr
                                            key={teacher.id}
                                            className="border-b border-black/5 last:border-0"
                                        >
                                            {/* FOTO */}
                                            <td className="px-4 py-4">
                                                {teacher.photoUrl ? (
                                                    <img
                                                        src={
                                                            teacher.photoUrl
                                                        }
                                                        alt={
                                                            teacher.name
                                                        }
                                                        className="h-12 w-9 rounded-md object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-9 items-center justify-center rounded-md bg-[#F5F2EC] text-xs text-black/40">
                                                        N/A
                                                    </div>
                                                )}
                                            </td>

                                            {/* NAMA */}
                                            <td className="px-4 py-4 font-medium text-black">
                                                {teacher.name}
                                            </td>

                                            {/* JABATAN */}
                                            <td className="px-4 py-4 text-black/60">
                                                {teacher.position}
                                            </td>

                                            {/* ORDER */}
                                            <td className="px-4 py-4 text-center text-black/60">
                                                {teacher.order}
                                            </td>

                                            {/* ACTION */}
                                            <td className="px-4 py-4">
                                                <div className="flex justify-end gap-2">
                                                    {/* EDIT */}
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="cursor-pointer text-black/50 hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B]"
                                                        onClick={() => onEdit(teacher)}
                                                    >
                                                        <Pencil className="size-4" />

                                                        <span className="sr-only">
                                                            Edit{" "}
                                                            {
                                                                teacher.name
                                                            }
                                                        </span>
                                                    </Button>

                                                    {/* DELETE */}
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="cursor-pointer text-black/50 hover:bg-red-50 hover:text-red-500"
                                                        onClick={() =>
                                                            handleOpenDelete(
                                                                teacher
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="size-4" />

                                                        <span className="sr-only">
                                                            Hapus{" "}
                                                            {
                                                                teacher.name
                                                            }
                                                        </span>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm text-black/50">
                                    Menampilkan {teachers.length} dari {total} guru
                                </p>

                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={page === 1 || loading}
                                        onClick={() =>
                                            setPage((current) => current - 1)
                                        }
                                        className="cursor-pointer"
                                    >
                                        Sebelumnya
                                    </Button>

                                    <span className="px-2 text-sm text-black/60">
                                        {page} / {totalPages}
                                    </span>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={
                                            page >= totalPages ||
                                            loading
                                        }
                                        onClick={() =>
                                            setPage((current) => current + 1)
                                        }
                                        className="cursor-pointer"
                                    >
                                        Berikutnya
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

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
                            Hapus Guru?
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-black/60">
                            Apakah kamu yakin ingin menghapus{" "}
                            <span className="font-semibold text-black">
                                {deleteTarget?.name}
                            </span>
                            ?
                            <br />
                            Data yang sudah dihapus tidak dapat
                            dikembalikan.
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
