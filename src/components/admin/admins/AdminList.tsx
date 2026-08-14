"use client";

import { useEffect, useState } from "react";
import {
    Eye,
    EyeOff,
    KeyRound,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";

import {
    getAdminList,
    resetAdminPassword,
    deleteAdmin,
} from "@/services/admin.service";

import type {
    Admin,
    AdminListMeta,
} from "@/types/admin";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface Props {
    onCreate: () => void;
}

export default function AdminList({
    onCreate,
}: Props) {
    const [admins, setAdmins] =
        useState<Admin[]>([]);

    const [meta, setMeta] =
        useState<AdminListMeta>({
            page: 1,
            size: 10,
            total: 0,
            totalPages: 0,
        });

    const [loading, setLoading] =
        useState(true);

    const [resetAdmin, setResetAdmin] =
        useState<Admin | null>(null);

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [resettingPassword, setResettingPassword] =
        useState(false);


    const [deleteTarget, setDeleteTarget] =
        useState<Admin | null>(null);

    const [deleting, setDeleting] =
        useState(false);

    async function loadAdmins(
        page: number = 1
    ) {
        try {
            setLoading(true);

            const response =
                await getAdminList(
                    page,
                    meta.size
                );

            setAdmins(response.data);
            setMeta(response.meta);
        } catch (error) {
            console.error(
                "Failed to load admin list:",
                error
            );

            toast.error(
                "Gagal memuat daftar admin",
                {
                    description:
                        "Data admin tidak dapat dimuat.",
                }
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAdmins(1);
    }, []);

    // =========================================================
    // PAGINATION
    // =========================================================

    function handlePrevious() {
        if (meta.page <= 1) {
            return;
        }

        loadAdmins(meta.page - 1);
    }

    function handleNext() {
        if (
            meta.page >= meta.totalPages
        ) {
            return;
        }

        loadAdmins(meta.page + 1);
    }

    function openResetPassword(
        admin: Admin
    ) {
        setResetAdmin(admin);
        setNewPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);
    }

    function closeResetPassword() {
        if (resettingPassword) {
            return;
        }

        setResetAdmin(null);
        setNewPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);
    }

    async function handleResetPassword() {
        if (!resetAdmin) {
            return;
        }

        if (!newPassword) {
            toast.error(
                "Password baru belum diisi"
            );
            return;
        }

        if (newPassword.length < 8) {
            toast.error(
                "Password minimal 8 karakter"
            );
            return;
        }

        if (newPassword.length > 72) {
            toast.error(
                "Password maksimal 72 karakter"
            );
            return;
        }

        if (!confirmPassword) {
            toast.error(
                "Konfirmasi password belum diisi"
            );
            return;
        }

        if (
            newPassword !==
            confirmPassword
        ) {
            toast.error(
                "Konfirmasi password tidak sesuai"
            );
            return;
        }

        try {
            setResettingPassword(true);

            await resetAdminPassword(
                resetAdmin.id,
                {
                    newPassword,
                }
            );

            toast.success(
                "Password berhasil direset",
                {
                    description:
                        `Password ${resetAdmin.username} berhasil diperbarui.`,
                }
            );

            closeResetPassword();
        } catch (error: any) {
            console.error(
                "Failed to reset admin password:",
                error
            );

            const message =
                error?.response?.data?.message;

            if (
                message ===
                "New password cannot be same as old password"
            ) {
                toast.error(
                    "Password baru tidak boleh sama",
                    {
                        description:
                            "Gunakan password yang berbeda dari password sebelumnya.",
                    }
                );
            } else {
                toast.error(
                    "Gagal mereset password",
                    {
                        description:
                            message ??
                            "Terjadi kesalahan saat mereset password.",
                    }
                );
            }
        } finally {
            setResettingPassword(false);
        }
    }

    async function handleDelete() {
        if (!deleteTarget) {
            return;
        }

        try {
            setDeleting(true);

            await deleteAdmin(
                deleteTarget.id
            );

            toast.success(
                "Admin berhasil dihapus",
                {
                    description:
                        `Akun ${deleteTarget.username} telah dihapus.`,
                }
            );

            setDeleteTarget(null);

            const nextPage =
                admins.length === 1 && meta.page > 1
                    ? meta.page - 1
                    : meta.page;

            await loadAdmins(nextPage);
        } catch (error: any) {
            console.error(
                "Failed to delete admin:",
                error
            );

            const message =
                error?.response?.data?.message;

            if (
                message ===
                "Cannot delete your own account"
            ) {
                toast.error(
                    "Tidak dapat menghapus akun sendiri"
                );
            } else if (
                message ===
                "Cannot delete SUPER ADMIN"
            ) {
                toast.error(
                    "SUPER ADMIN tidak dapat dihapus"
                );
            } else {
                toast.error(
                    "Gagal menghapus admin",
                    {
                        description:
                            message ??
                            "Terjadi kesalahan saat menghapus admin.",
                    }
                );
            }
        } finally {
            setDeleting(false);
        }
    }

    return (
        <>
            <Card className="border-0 bg-[#FFFDF7]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold text-black">
                            Daftar Admin 
                        </CardTitle>

                        <p className="mt-1 text-sm text-black/40">
                            Kelola akun administrator sistem.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-black/40">
                            {meta.total} admin
                        </span>

                        <Button
                            type="button"
                            onClick={onCreate}
                            className="cursor-pointer bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                        >
                            Tambah Admin
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div className="py-10 text-center text-sm text-black/40">
                            Memuat daftar admin...
                        </div>
                    ) : admins.length === 0 ? (
                        <div className="rounded-lg bg-[#F5F2EC] py-10 text-center">
                            <p className="text-sm text-black/40">
                                Belum ada admin.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* TABLE */}
                            <div className="overflow-hidden rounded-lg border border-black/10">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-black/10 bg-[#F5F2EC]">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-black/60">
                                                Username
                                            </th>

                                            <th className="px-4 py-3 text-left text-sm font-semibold text-black/60">
                                                Nama
                                            </th>

                                            <th className="px-4 py-3 text-left text-sm font-semibold text-black/60">
                                                Role
                                            </th>

                                            <th className="px-4 py-3 text-left text-sm font-semibold text-black/60">
                                                Dibuat
                                            </th>

                                            <th className="px-4 py-3 text-right text-sm font-semibold text-black/60">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {admins.map(
                                            (admin) => (
                                                <tr
                                                    key={
                                                        admin.id
                                                    }
                                                    className="border-b border-black/5 last:border-0 hover:bg-[#F5F2EC]/50"
                                                >
                                                    <td className="px-4 py-4 text-sm font-medium text-black">
                                                        {
                                                            admin.username
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-black/70">
                                                        {
                                                            admin.name
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <span
                                                            className={`
                                                                inline-flex
                                                                rounded-full
                                                                px-2.5
                                                                py-1
                                                                text-xs
                                                                font-medium
                                                                ${
                                                                    admin.role ===
                                                                    "SUPER_ADMIN"
                                                                        ? "bg-[#FF6B6B]/10 text-[#FF6B6B]"
                                                                        : "bg-[#F5F2EC] text-black/50"
                                                                }
                                                            `}
                                                        >
                                                            {
                                                                admin.role ===
                                                                "SUPER_ADMIN"
                                                                    ? "SUPER ADMIN"
                                                                    : "ADMIN"
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-black/50">
                                                        {new Date(
                                                            admin.createdAt
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <div className="flex justify-end gap-1">
                                                            {/* RESET PASSWORD */}
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    openResetPassword(
                                                                        admin
                                                                    )
                                                                }
                                                                className="size-8 cursor-pointer text-black/40 hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B]"
                                                                title="Reset password"
                                                            >
                                                                <KeyRound className="size-4" />

                                                                <span className="sr-only">
                                                                    Reset password
                                                                </span>
                                                            </Button>

                                                            {/* DELETE */}
                                                            {admin.role !==
                                                                "SUPER_ADMIN" && (
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        setDeleteTarget(
                                                                            admin
                                                                        )
                                                                    }
                                                                    className="size-8 cursor-pointer text-black/40 hover:bg-red-50 hover:text-red-500"
                                                                    title="Hapus admin"
                                                                >
                                                                    <Trash2 className="size-4" />

                                                                    <span className="sr-only">
                                                                        Hapus admin
                                                                    </span>
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* PAGINATION */}
                            {meta.totalPages >
                                1 && (
                                <div className="mt-5 flex items-center justify-between">
                                    <p className="text-sm text-black/40">
                                        Halaman{" "}
                                        <span className="font-medium text-black/60">
                                            {
                                                meta.page
                                            }
                                        </span>{" "}
                                        dari{" "}
                                        <span className="font-medium text-black/60">
                                            {
                                                meta.totalPages
                                            }
                                        </span>
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={
                                                loading ||
                                                meta.page <=
                                                    1
                                            }
                                            onClick={
                                                handlePrevious
                                            }
                                            className="cursor-pointer border-black/10 bg-white"
                                        >
                                            Sebelumnya
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={
                                                loading ||
                                                meta.page >=
                                                    meta.totalPages
                                            }
                                            onClick={
                                                handleNext
                                            }
                                            className="cursor-pointer border-black/10 bg-white"
                                        >
                                            Berikutnya
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>

            {/* RESET PASSWORD DIALOG */}

            <AlertDialog
                open={resetAdmin !== null}
                onOpenChange={(open) => {
                    if (
                        !open &&
                        !resettingPassword
                    ) {
                        closeResetPassword();
                    }
                }}
            >
                <AlertDialogContent className="border-0 bg-[#FFFDF7]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">
                            Reset Password
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-black/60">
                            Reset password untuk akun{" "}
                            <span className="font-semibold text-black/70">
                                {resetAdmin?.username}
                            </span>
                            .
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-4 py-2">
                        {/* NEW PASSWORD */}
                        <div className="space-y-2">
                            <Label htmlFor="new-admin-password">
                                Password Baru
                            </Label>

                            <div className="relative">
                                <Input
                                    id="new-admin-password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        newPassword
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setNewPassword(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Masukkan password baru"
                                    disabled={
                                        resettingPassword
                                    }
                                    className="bg-white pr-10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (value) =>
                                                !value
                                        )
                                    }
                                    disabled={
                                        resettingPassword
                                    }
                                    className="absolute right-0 top-0 flex h-full w-10 cursor-pointer items-center justify-center text-black/40 hover:text-black/70 disabled:cursor-not-allowed"
                                    aria-label={
                                        showPassword
                                            ? "Sembunyikan password"
                                            : "Tampilkan password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            </div>

                            <p className="text-xs text-black/40">
                                Password harus 8–72
                                karakter.
                            </p>
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="space-y-2">
                            <Label htmlFor="confirm-admin-password">
                                Konfirmasi Password
                            </Label>

                            <div className="relative">
                                <Input
                                    id="confirm-admin-password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        confirmPassword
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setConfirmPassword(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Masukkan ulang password"
                                    disabled={
                                        resettingPassword
                                    }
                                    className="bg-white pr-10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (value) =>
                                                !value
                                        )
                                    }
                                    disabled={
                                        resettingPassword
                                    }
                                    className="absolute right-0 top-0 flex h-full w-10 cursor-pointer items-center justify-center text-black/40 hover:text-black/70 disabled:cursor-not-allowed"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Sembunyikan konfirmasi password"
                                            : "Tampilkan konfirmasi password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={
                                resettingPassword
                            }
                            className="cursor-pointer bg-[#FFFDF7] text-black hover:bg-[#F5F2EC] hover:text-black"
                        >
                            Batal
                        </AlertDialogCancel>

                        <AlertDialogAction
                            disabled={
                                resettingPassword
                            }
                            onClick={(event) => {
                                event.preventDefault();

                                handleResetPassword();
                            }}
                            className="cursor-pointer bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                        >
                            {resettingPassword
                                ? "Menyimpan..."
                                : "Reset Password"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* DELETE DIALOG */}

            <AlertDialog
                open={deleteTarget !== null}
                onOpenChange={(open) => {
                    if (
                        !open &&
                        !deleting
                    ) {
                        setDeleteTarget(null);
                    }
                }}
            >
                <AlertDialogContent className="border-0 bg-[#FFFDF7]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">
                            Hapus Admin?
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-black/60">
                            Apakah kamu yakin ingin
                            menghapus akun{" "}
                            <span className="font-semibold text-black/70">
                                {deleteTarget?.username}
                            </span>
                            ? Data akun yang sudah
                            dihapus tidak dapat
                            dikembalikan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={deleting}
                            className="cursor-pointer bg-[#FFFDF7] text-black hover:bg-[#F5F2EC] hover:text-black"
                        >
                            Batal
                        </AlertDialogCancel>

                        <AlertDialogAction
                            disabled={deleting}
                            onClick={(event) => {
                                event.preventDefault();

                                handleDelete();
                            }}
                            className="cursor-pointer bg-red-500 text-white hover:bg-red-600"
                        >
                            {deleting
                                ? "Menghapus..."
                                : "Hapus Admin"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

