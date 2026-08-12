"use client";

import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";

import {
    createTeacher,
    updateTeacher,
} from "@/services/teacher.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Teacher } from "@/types/teacher";

interface Props {
    teacher: Teacher | null;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function TeacherForm({
    teacher,
    onCancel,
    onSuccess,
}: Props) {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [order, setOrder] = useState("");
    const [photo, setPhoto] = useState<File | undefined>();

    const [preview, setPreview] = useState<string | null>(
        null
    );

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (teacher) {
            setName(teacher.name);
            setPosition(teacher.position);
            setOrder(String(teacher.order));

            setPhoto(undefined);
            setPreview(teacher.photoUrl ?? null);
        } else {
            setName("");
            setPosition("");
            setOrder("");
            setPhoto(undefined);
            setPreview(null);
        }
    }, [teacher]);

    function handlePhotoChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        // Maksimal 2 MB
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Ukuran foto terlalu besar", {
                description:
                    "Ukuran foto maksimal 2 MB.",
            });

            event.target.value = "";
            return;
        }

        setPhoto(file);

        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!name.trim()) {
            toast.error("Nama belum diisi");
            return;
        }

        if (!position.trim()) {
            toast.error("Jabatan belum diisi");
            return;
        }

        try {
            setLoading(true);

            const request = {
                name: name.trim(),
                position: position.trim(),
                order: order
                    ? Number(order)
                    : undefined,
                photo,
            };

            if (teacher) {
                await updateTeacher(
                    teacher.id,
                    request
                );

                toast.success("Guru berhasil diperbarui", {
                    description:
                        "Data guru berhasil diperbarui.",
                });
            } else {
                await createTeacher(request);

                toast.success("Guru berhasil ditambahkan", {
                    description:
                        "Data guru berhasil disimpan.",
                });
            }

            onSuccess();
        } catch (error) {
            console.error(
                teacher
                    ? "Failed to update teacher:"
                    : "Failed to create teacher:",
                error
            );

            toast.error(
                teacher
                    ? "Gagal memperbarui guru"
                    : "Gagal menambahkan guru",
                {
                    description:
                        "Terjadi kesalahan saat menyimpan data.",
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
                    {teacher ? "Edit Guru" : "Tambah Guru"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* Nama */}
                    <div className="space-y-2">
                        <Label htmlFor="teacher-name">
                            Nama Guru
                        </Label>

                        <Input
                            id="teacher-name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Contoh: Ibu Sri Wahyuni"
                            disabled={loading}
                            className="bg-white"
                        />
                    </div>

                    {/* Jabatan */}
                    <div className="space-y-2">
                        <Label htmlFor="teacher-position">
                            Jabatan
                        </Label>

                        <Input
                            id="teacher-position"
                            value={position}
                            onChange={(event) =>
                                setPosition(
                                    event.target.value
                                )
                            }
                            placeholder="Contoh: Kepala Sekolah"
                            disabled={loading}
                            className="bg-white"
                        />
                    </div>

                    {/* Urutan */}
                    <div className="space-y-2">
                        <Label htmlFor="teacher-order">
                            Urutan (Opsional)
                        </Label>

                        <Input
                            id="teacher-order"
                            type="number"
                            min={1}
                            value={order}
                            onChange={(event) =>
                                setOrder(event.target.value)
                            }
                            placeholder="Contoh: 1"
                            disabled={loading}
                            className="bg-white"
                        />

                        <p className="text-sm text-black/40">
                            Menentukan posisi guru pada
                            halaman website.
                        </p>
                    </div>

                    {/* Foto */}
                    <div className="space-y-2">
                        <Label htmlFor="teacher-photo">
                            Foto Guru
                        </Label>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                            {/* Preview */}
                            <div className="flex h-40 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F5F2EC]">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview foto guru"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <ImagePlus className="size-10 text-black/20" />
                                )}
                            </div>

                            {/* Input */}
                            <div className="space-y-2">
                                <Input
                                    id="teacher-photo"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={
                                        handlePhotoChange
                                    }
                                    disabled={loading}
                                    className="cursor-pointer bg-white"
                                />

                                <p className="text-sm text-black/40">
                                    JPG, PNG, atau WEBP.
                                    Maksimal 2 MB.
                                </p>
                            </div>
                        </div>
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
                                ? "Menyimpan..." : teacher
                                ? "Update Guru" : "Simpan Guru"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}