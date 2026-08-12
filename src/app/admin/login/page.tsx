"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/services/auth.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";

export default function AdminLoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setLoading(true);

        try {
            await login({
                username,
                password,
            });

            toast.success("Login berhasil", {
                description:
                    "Selamat datang di dashboard admin.",
            });

            setTimeout(() => {
                router.push("/admin");
            }, 500);
        } catch (error) {
            console.error("Login failed:", error);

            toast.error("Login gagal", {
                description:
                    "Username atau password salah.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F5F2EC] p-6">
            <Card className="w-full max-w-md border-0 bg-[#FFFDF7] shadow-lg">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-center text-2xl font-bold text-[#FF6B6B]">
                        Login Admin
                    </CardTitle>

                    <p className="text-center text-sm text-black/60">
                        Masuk untuk mengelola website TK Persiapan
                    </p>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <Label
                                htmlFor="username"
                                className="text-black"
                            >
                                Username
                            </Label>

                            <Input
                                id="username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                autoComplete="username"
                                className="border-black/20 bg-[#FFFDF7] focus-visible:border-[#FF6B6B] focus-visible:ring-[#FF6B6B]/30"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-black"
                            >
                                Password
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                autoComplete="current-password"
                                className="border-black/20 bg-[#FFFDF7] focus-visible:border-[#FF6B6B] focus-visible:ring-[#FF6B6B]/30"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-11 w-full cursor-pointer bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                        >
                            {loading ? "Masuk..." : "Masuk"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}