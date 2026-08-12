"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { toast } from "sonner";

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
    getCurrentUser,
    updateCurrentUser,
} from "@/services/auth.service";

import type { CurrentUser } from "@/types/auth";

export default function AdminProfile() {
    const [user, setUser] = useState<CurrentUser | null>(null);

    const [name, setName] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(true);
    const [savingName, setSavingName] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    useEffect(() => {
        async function loadUser() {
            try {
                const currentUser = await getCurrentUser();

                setUser(currentUser);
                setName(currentUser.name);
            } catch (error) {
                console.error("Failed to load profile:", error);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    async function handleUpdateName(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Nama tidak boleh kosong.");
            return;
        }

        try {
            setSavingName(true);

            const updatedUser = await updateCurrentUser({
                name: name.trim(),
            });

            setUser(updatedUser);
            setName(updatedUser.name);

            toast.success("Nama berhasil diperbarui.", {
                description: "Informasi profil kamu sudah diperbarui.",
            });
        } catch (error) {
            console.error("Failed to update name:", error);

            toast.error("Gagal memperbarui nama.", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Silakan coba lagi.",
            });
        } finally {
            setSavingName(false);
        }
    }

    async function handleUpdatePassword(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("Semua field password wajib diisi.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Konfirmasi password tidak cocok.");
            return;
        }

        if (newPassword === oldPassword) {
            toast.error(
                "Password baru harus berbeda dari password lama."
            );
            return;
        }

        try {
            setSavingPassword(true);

            await updateCurrentUser({
                oldPassword,
                newPassword,
            });

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

            toast.success("Password berhasil diubah.", {
                description:
                    "Password akun kamu sudah diperbarui.",
            });
        } catch (error) {
            console.error(
                "Failed to update password:",
                error
            );

            toast.error("Gagal mengubah password.", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Silakan coba lagi.",
            });
        } finally {
            setSavingPassword(false);
        }
    }

    if (loading) {
        return (
            <div className="py-8 text-center text-black/50">
                Memuat profil...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="py-8 text-center text-black/50">
                Gagal memuat profil.
            </div>
        );
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Informasi & Nama */}
            <Card className="border-0 bg-[#FFFDF7]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-black">
                        <User className="size-5 text-[#FF6B6B]/80" />
                        Informasi Akun
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid gap-4">
                        <div>
                            <p className="text-sm text-black/50">
                                Username
                            </p>

                            <p className="font-medium text-black">
                                {user.username}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-black/50">
                                Role
                            </p>

                            <p className="font-medium text-black">
                                {user.role}
                            </p>
                        </div>
                    </div>

                    <div className="h-px bg-black/10" />

                    <form
                        onSubmit={handleUpdateName}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="text-black"
                            >
                                Nama
                            </Label>

                            <Input
                                id="name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                className="border-black/10 bg-white focus-visible:ring-[#FF6B6B]/50"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={savingName}
                            className="cursor-pointer bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                        >
                            {savingName
                                ? "Menyimpan..."
                                : "Simpan Nama"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Password */}
            <Card className="border-0 bg-[#FFFDF7]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-black">
                        <Lock className="size-5 text-[#FF6B6B]/80" />
                        Ubah Password
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleUpdatePassword}
                        className="space-y-4"
                    >
                        <PasswordInput
                            id="oldPassword"
                            label="Password Lama"
                            value={oldPassword}
                            onChange={setOldPassword}
                            show={showOldPassword}
                            onToggle={() =>
                                setShowOldPassword(
                                    !showOldPassword
                                )
                            }
                        />

                        <PasswordInput
                            id="newPassword"
                            label="Password Baru"
                            value={newPassword}
                            onChange={setNewPassword}
                            show={showNewPassword}
                            onToggle={() =>
                                setShowNewPassword(
                                    !showNewPassword
                                )
                            }
                        />

                        <PasswordInput
                            id="confirmPassword"
                            label="Konfirmasi Password"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            show={showConfirmPassword}
                            onToggle={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                        />

                        <Button
                            type="submit"
                            disabled={savingPassword}
                            className="cursor-pointer bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                        >
                            {savingPassword
                                ? "Mengubah..."
                                : "Ubah Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

interface PasswordInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    show: boolean;
    onToggle: () => void;
}

function PasswordInput({
    id,
    label,
    value,
    onChange,
    show,
    onToggle,
}: PasswordInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-black">
                {label}
            </Label>

            <div className="relative">
                <Input
                    id={id}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    className="border-black/10 bg-white pr-10 focus-visible:ring-[#FF6B6B]/50"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black/40 hover:text-black/70"
                >
                    {show ? (
                        <EyeOff className="size-4" />
                    ) : (
                        <Eye className="size-4" />
                    )}
                </button>
            </div>
        </div>
    );
}