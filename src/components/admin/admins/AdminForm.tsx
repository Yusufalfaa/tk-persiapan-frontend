"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { createAdmin } from "@/services/admin.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Props {
    onCancel: () => void;
    onSuccess: () => void;
}

export default function AdminForm({
    onCancel,
    onSuccess,
}: Props) {
    const [username, setUsername] =
        useState("");

    const [name, setName] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const trimmedUsername =
            username.trim();

        const trimmedName =
            name.trim();

        // USERNAME
        if (!trimmedUsername) {
            toast.error("Username belum diisi");
            return;
        }

        if (
            trimmedUsername.length < 3 ||
            trimmedUsername.length > 50
        ) {
            toast.error(
                "Username harus 3–50 karakter"
            );
            return;
        }

        if (
            !/^[a-zA-Z0-9_-]+$/.test(
                trimmedUsername
            )
        ) {
            toast.error(
                "Username hanya boleh mengandung huruf, angka, underscore, dan tanda minus"
            );
            return;
        }

        // NAME
        if (!trimmedName) {
            toast.error("Nama belum diisi");
            return;
        }

        if (
            trimmedName.length < 3 ||
            trimmedName.length > 100
        ) {
            toast.error(
                "Nama harus 3–100 karakter"
            );
            return;
        }

        // PASSWORD
        if (!password) {
            toast.error("Password belum diisi");
            return;
        }

        if (password.length < 8) {
            toast.error(
                "Password minimal 8 karakter"
            );
            return;
        }

        if (password.length > 72) {
            toast.error(
                "Password maksimal 72 karakter"
            );
            return;
        }

        // CONFIRM PASSWORD
        if (!confirmPassword) {
            toast.error(
                "Konfirmasi password belum diisi"
            );
            return;
        }

        if (password !== confirmPassword) {
            toast.error(
                "Konfirmasi password tidak sesuai"
            );
            return;
        }

        try {
            setLoading(true);

            await createAdmin({
                username: trimmedUsername,
                name: trimmedName,
                password,
            });

            toast.success(
                "Admin berhasil ditambahkan",
                {
                    description:
                        "Akun admin baru berhasil dibuat.",
                }
            );

            onSuccess();
        } catch (error: any) {
            console.error(
                "Failed to create admin:",
                error
            );

            const message =
                error?.response?.data?.message;

            if (
                message ===
                "Username already exists"
            ) {
                toast.error(
                    "Username sudah digunakan",
                    {
                        description:
                            "Silakan gunakan username lain.",
                    }
                );
            } else {
                toast.error(
                    "Gagal menambahkan admin",
                    {
                        description:
                            message ??
                            "Terjadi kesalahan saat membuat akun admin.",
                    }
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="border-0 bg-[#FFFDF7]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-black">
                    Tambah Admin
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* USERNAME */}
                    <div className="space-y-2">
                        <Label htmlFor="admin-username">
                            Username
                        </Label>

                        <Input
                            id="admin-username"
                            value={username}
                            onChange={(event) =>
                                setUsername(
                                    event.target.value
                                )
                            }
                            placeholder="Masukkan username"
                            disabled={loading}
                            className="bg-white"
                        />

                        <p className="text-xs text-black/40">
                            3–50 karakter. Hanya boleh
                            menggunakan huruf, angka,
                            underscore, dan tanda minus.
                        </p>
                    </div>

                    {/* NAME */}
                    <div className="space-y-2">
                        <Label htmlFor="admin-name">
                            Nama
                        </Label>

                        <Input
                            id="admin-name"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            placeholder="Masukkan nama admin"
                            disabled={loading}
                            className="bg-white"
                        />

                        <p className="text-xs text-black/40">
                            3–100 karakter.
                        </p>
                    </div>

                    {/* PASSWORD */}
                    <div className="space-y-2">
                        <Label htmlFor="admin-password">
                            Password
                        </Label>

                        <div className="relative">
                            <Input
                                id="admin-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="Masukkan password"
                                disabled={loading}
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
                                disabled={loading}
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
                            Password harus 8–72 karakter.
                        </p>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="space-y-2">
                        <Label htmlFor="admin-confirm-password">
                            Konfirmasi Password
                        </Label>

                        <div className="relative">
                            <Input
                                id="admin-confirm-password"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="Masukkan ulang password"
                                disabled={loading}
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
                                disabled={loading}
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

                    {/* ACTION */}
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
                                : "Simpan Admin"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
