"use client";

import { useState } from "react";
import {
    ImagePlus,
    Link as LinkIcon,
    Type,
} from "lucide-react";
import { toast } from "sonner";

import {
    createNewsSection,
    updateNewsSection,
} from "@/services/news.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type {
    NewsSection,
    NewsSectionType,
} from "@/types/news";

import RichTextEditor from "../../news/RichTextEditor";
import { getStorageUrl } from "@/lib/storage-url";

interface Props {
    newsId: number;
    initialType: NewsSectionType;
    section?: NewsSection;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function NewsSectionForm({
    newsId,
    initialType,
    section,
    onCancel,
    onSuccess,
}: Props) {
    const isEdit = !!section;

    /*
     * Saat edit:
     * type dikunci dari section.type
     *
     * Saat create:
     * type berasal dari initialType dan bisa diganti.
     */
    const [type, setType] =
        useState<NewsSectionType>(
            section?.type ?? initialType
        );

    const [text, setText] = useState(
        section?.text ?? ""
    );

    const [youtubeUrl, setYoutubeUrl] =
        useState(
            section?.youtubeUrl ?? ""
        );

    const [image, setImage] =
        useState<File | undefined>();

    const [preview, setPreview] = useState<string | null>(
        getStorageUrl(section?.imageUrl)
    );
    const [loading, setLoading] =
        useState(false);

    function handleImageChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error(
                "Ukuran gambar terlalu besar",
                {
                    description:
                        "Ukuran gambar maksimal 2 MB.",
                }
            );

            event.target.value = "";
            return;
        }

        setImage(file);

        const previewUrl =
            URL.createObjectURL(file);

        setPreview(previewUrl);
    }
    
    function handleTypeChange(
        newType: NewsSectionType
    ) {
        if (isEdit) {
            return;
        }

        setType(newType);

        setText("");
        setYoutubeUrl("");
        setImage(undefined);
        setPreview(null);
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        /*
         * Validasi TEXT
         */
        if (
            type === "TEXT" &&
            !text
                .replace(/<[^>]*>/g, "")
                .trim()
        ) {
            toast.error(
                "Isi section belum diisi"
            );
            return;
        }

        /*
         * Validasi YOUTUBE
         */
        if (
            type === "YOUTUBE" &&
            !youtubeUrl.trim()
        ) {
            toast.error(
                "URL YouTube belum diisi"
            );
            return;
        }

        if (
            type === "IMAGE" &&
            !image &&
            !section?.imageUrl
        ) {
            toast.error(
                "Gambar belum dipilih"
            );
            return;
        }

        try {
            setLoading(true);

            if (isEdit && section) {
                await updateNewsSection(
                    section.id,
                    {
                        text:
                            type === "TEXT"
                                ? text.trim()
                                : undefined,

                        youtubeUrl:
                            type === "YOUTUBE"
                                ? youtubeUrl.trim()
                                : undefined,

                        image:
                            type === "IMAGE"
                                ? image
                                : undefined,
                    }
                );

                toast.success(
                    "Section berhasil diperbarui",
                    {
                        description:
                            "Perubahan section berhasil disimpan.",
                    }
                );
            }

            /*
             * ============================================
             * CREATE
             * ============================================
             */
            else {
                await createNewsSection(
                    newsId,
                    {
                        type,

                        text:
                            type === "TEXT"
                                ? text.trim()
                                : undefined,

                        youtubeUrl:
                            type === "YOUTUBE"
                                ? youtubeUrl.trim()
                                : undefined,

                        image:
                            type === "IMAGE"
                                ? image
                                : undefined,
                    }
                );

                toast.success(
                    "Section berhasil ditambahkan",
                    {
                        description:
                            "Section berhasil disimpan ke berita.",
                    }
                );
            }

            onSuccess();
        } catch (error) {
            console.error(
                isEdit
                    ? "Failed to update section:"
                    : "Failed to create section:",
                error
            );

            toast.error(
                isEdit
                    ? "Gagal memperbarui section"
                    : "Gagal menambahkan section",
                {
                    description:
                        "Terjadi kesalahan saat menyimpan section.",
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
                    {isEdit
                        ? "Edit Section"
                        : "Tambah Section"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* ================================================= */}
                    {/* TYPE - CREATE ONLY */}
                    {/* ================================================= */}

                    {!isEdit && (
                        <div className="space-y-2">
                            <Label>
                                Tipe Section
                            </Label>

                            <div className="grid grid-cols-3 gap-3">
                                {/* TEXT */}

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() =>
                                        handleTypeChange(
                                            "TEXT"
                                        )
                                    }
                                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-colors ${
                                        type === "TEXT"
                                            ? "border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B]"
                                            : "border-black/10 bg-white text-black/50 hover:bg-[#F5F2EC]"
                                    }`}
                                >
                                    <Type className="size-5" />

                                    <span className="text-sm font-medium">
                                        Text
                                    </span>
                                </button>

                                {/* IMAGE */}

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() =>
                                        handleTypeChange(
                                            "IMAGE"
                                        )
                                    }
                                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-colors ${
                                        type === "IMAGE"
                                            ? "border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B]"
                                            : "border-black/10 bg-white text-black/50 hover:bg-[#F5F2EC]"
                                    }`}
                                >
                                    <ImagePlus className="size-5" />

                                    <span className="text-sm font-medium">
                                        Image
                                    </span>
                                </button>

                                {/* YOUTUBE */}

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() =>
                                        handleTypeChange(
                                            "YOUTUBE"
                                        )
                                    }
                                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-colors ${
                                        type === "YOUTUBE"
                                            ? "border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B]"
                                            : "border-black/10 bg-white text-black/50 hover:bg-[#F5F2EC]"
                                    }`}
                                >
                                    <LinkIcon className="size-5" />

                                    <span className="text-sm font-medium">
                                        URL
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ================================================= */}
                    {/* TEXT */}
                    {/* ================================================= */}

                    {type === "TEXT" && (
                        <div className="space-y-2">
                            <Label>
                                Isi Text
                            </Label>

                            <RichTextEditor
                                value={text}
                                onChange={setText}
                                disabled={loading}
                            />
                        </div>
                    )}

                    {/* ================================================= */}
                    {/* IMAGE */}
                    {/* ================================================= */}

                    {type === "IMAGE" && (
                        <div className="space-y-2">
                            <Label htmlFor="section-image">
                                Gambar
                            </Label>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                <div className="flex h-40 w-56 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F5F2EC]">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Preview gambar section"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <ImagePlus className="size-10 text-black/20" />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Input
                                        id="section-image"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={
                                            handleImageChange
                                        }
                                        disabled={loading}
                                        className="cursor-pointer bg-white"
                                    />

                                    <p className="text-sm text-black/40">
                                        JPG, PNG, atau WEBP.
                                        Maksimal 2 MB.
                                    </p>

                                    {isEdit &&
                                        section?.imageUrl && (
                                            <p className="text-xs text-black/40">
                                                Kosongkan jika
                                                tidak ingin
                                                mengganti gambar.
                                            </p>
                                        )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================================================= */}
                    {/* YOUTUBE */}
                    {/* ================================================= */}

                    {type === "YOUTUBE" && (
                        <div className="space-y-2">
                            <Label htmlFor="section-youtube">
                                URL YouTube
                            </Label>

                            <Input
                                id="section-youtube"
                                type="url"
                                value={youtubeUrl}
                                onChange={(event) =>
                                    setYoutubeUrl(
                                        event.target.value
                                    )
                                }
                                placeholder="https://www.youtube.com/watch?v=..."
                                disabled={loading}
                                className="bg-white"
                            />

                            <p className="text-sm text-black/40">
                                Masukkan URL video YouTube
                                yang ingin ditampilkan.
                            </p>
                        </div>
                    )}

                    {/* ================================================= */}
                    {/* ACTION */}
                    {/* ================================================= */}

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
                                : isEdit
                                  ? "Simpan Perubahan"
                                  : "Simpan Section"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}