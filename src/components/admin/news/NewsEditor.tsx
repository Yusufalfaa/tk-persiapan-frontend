"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Type,
    ImagePlus,
    Link,
    Trash2,
    Pencil,
    ArrowUp,
    ArrowDown,
} from "lucide-react";

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
    getAdminNewsDetail,
    updateNews,
    deleteNewsSection,
    reorderNewsSection,
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type {
    AdminNewsDetail,
    NewsList,
    NewsSection,
    NewsSectionType,
} from "@/types/news";

import NewsSectionForm from "./NewsSectionForm";
import { getStorageUrl } from "@/lib/storage-url";

interface Props {
    news: NewsList;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function NewsEditor({
    news,
    onCancel,
    onSuccess,
}: Props) {
    const [detail, setDetail] =
        useState<AdminNewsDetail | null>(null);

    const [title, setTitle] = useState("");
    const [isPublished, setIsPublished] =
        useState<boolean>(true);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [selectedSectionType, setSelectedSectionType] =
        useState<NewsSectionType | null>(null);

    const [editingSection, setEditingSection] =
        useState<NewsSection | null>(null);

    const [deleteSectionId, setDeleteSectionId] =
        useState<number | null>(null);

    async function loadNewsDetail() {
        try {
            setLoading(true);

            const response =
                await getAdminNewsDetail(news.id);

            setDetail(response);
            setTitle(response.title);
            setIsPublished(response.isPublished);
        } catch (error) {
            console.error(
                "Failed to load news detail:",
                error
            );

            toast.error(
                "Gagal memuat detail berita",
                {
                    description:
                        "Data berita tidak dapat dimuat.",
                }
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadNewsDetail();
    }, [news.id]);

    // =========================================================
    // NEWS
    // =========================================================

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!title.trim()) {
            toast.error("Judul belum diisi");
            return;
        }

        try {
            setSaving(true);

            await updateNews(news.id, {
                title: title.trim(),
                isPublished,
            });

            toast.success(
                "Berita berhasil diperbarui",
                {
                    description:
                        "Informasi berita berhasil disimpan.",
                }
            );

            onSuccess();
        } catch (error) {
            console.error(
                "Failed to update news:",
                error
            );

            toast.error(
                "Gagal memperbarui berita",
                {
                    description:
                        "Terjadi kesalahan saat menyimpan berita.",
                }
            );
        } finally {
            setSaving(false);
        }
    }

    function handleSelectSectionType(
        type: NewsSectionType
    ) {
        if (
            !detail?.canAddSection ||
            editingSection !== null
        ) {
            return;
        }

        setSelectedSectionType(type);
    }

    function handleCancelSectionForm() {
        setSelectedSectionType(null);
    }

    function handleEditSection(
        section: NewsSection
    ) {
        if (saving || editingSection !== null) {
            return;
        }

        setSelectedSectionType(null);
        setEditingSection(section);
    }

    function handleCancelEditSection() {
        setEditingSection(null);
    }

    async function handleSectionSuccess() {
        setEditingSection(null);
        setSelectedSectionType(null);

        await loadNewsDetail();
    }

    async function handleDeleteSection() {
        if (deleteSectionId === null) {
            return;
        }

        try {
            setSaving(true);

            await deleteNewsSection(
                deleteSectionId
            );

            toast.success(
                "Section berhasil dihapus",
                {
                    description:
                        "Section telah dihapus dari berita.",
                }
            );

            setDeleteSectionId(null);

            await loadNewsDetail();
        } catch (error) {
            console.error(
                "Failed to delete section:",
                error
            );

            toast.error(
                "Gagal menghapus section",
                {
                    description:
                        "Terjadi kesalahan saat menghapus section.",
                }
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleReorderSection(
        sectionId: number,
        direction: "UP" | "DOWN"
    ) {
        if (editingSection !== null) {
            return;
        }

        try {
            setSaving(true);

            await reorderNewsSection(
                sectionId,
                direction
            );

            await loadNewsDetail();
        } catch (error) {
            console.error(
                "Failed to reorder section:",
                error
            );

            toast.error(
                "Gagal memindahkan section",
                {
                    description:
                        "Terjadi kesalahan saat mengubah urutan section.",
                }
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <Card className="border-0 bg-[#FFFDF7]">
                <CardContent>
                    <div className="py-10 text-center text-black/50">
                        Memuat detail berita...
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!detail) {
        return (
            <Card className="border-0 bg-[#FFFDF7]">
                <CardContent>
                    <div className="py-10 text-center text-black/50">
                        Detail berita tidak ditemukan.
                    </div>

                    <div className="mt-4 flex justify-center">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="cursor-pointer"
                        >
                            Kembali
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">

            <Card className="border-0 bg-[#FFFDF7]">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-black">
                        Edit Berita
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* TITLE */}
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
                                placeholder="Masukkan judul berita"
                                disabled={saving}
                                className="bg-white"
                            />
                        </div>

                        {/* STATUS */}
                        <div className="space-y-2">
                            <Label htmlFor="news-status">
                                Status
                            </Label>

                            <Select
                                value={
                                    isPublished
                                        ? "published"
                                        : "draft"
                                }
                                onValueChange={(value) =>
                                    setIsPublished(
                                        value ===
                                            "published"
                                    )
                                }
                                disabled={saving}
                            >
                                <SelectTrigger
                                    id="news-status"
                                    className="w-full bg-white"
                                >
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="published">
                                        Published
                                    </SelectItem>

                                    <SelectItem value="draft">
                                        Draft
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <p className="text-sm text-black/40">
                                Berita dengan status Published
                                akan ditampilkan di website.
                            </p>
                        </div>

                        {/* AUTHOR */}
                        <div className="space-y-1">
                            <p className="text-sm text-black/40">
                                Author
                            </p>

                            <p className="font-medium text-black">
                                {detail.author?.name ??
                                    "-"}
                            </p>
                        </div>

                        {/* ACTION */}
                        <div className="flex justify-end gap-3 border-t border-black/10 pt-6">
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={saving}
                                onClick={onCancel}
                                className="cursor-pointer"
                            >
                                Batal
                            </Button>

                            <Button
                                type="submit"
                                disabled={saving}
                                className="cursor-pointer bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                            >
                                {saving
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card className="border-0 bg-[#FFFDF7]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold text-black">
                            Sections
                        </CardTitle>

                        <p className="mt-1 text-sm text-black/40">
                            Susun isi berita berdasarkan
                            section.
                        </p>
                    </div>

                    <span className="text-sm text-black/40">
                        {detail.sectionCount} section
                    </span>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">

                        {detail.sections.map(
                            (section, index) => {

                                const isEditing =
                                    editingSection?.id ===
                                    section.id;

                                return (
                                    <div
                                        key={section.id}
                                    >
                                        {isEditing ? (
                                            <NewsSectionForm
                                                newsId={
                                                    news.id
                                                }
                                                initialType={
                                                    section.type
                                                }
                                                section={
                                                    section
                                                }
                                                onCancel={
                                                    handleCancelEditSection
                                                }
                                                onSuccess={
                                                    handleSectionSuccess
                                                }
                                            />
                                        ) : (
                                            <div className="rounded-xl border border-black/10 bg-white p-5">

                                                {/* SECTION HEADER */}
                                                <div className="flex items-start justify-between gap-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex size-9 items-center justify-center rounded-lg bg-[#F5F2EC] text-sm font-semibold text-black/60">
                                                            {index + 1}
                                                        </div>

                                                        <div>
                                                            <p className="font-semibold text-black">
                                                                Section{" "}
                                                                {index +
                                                                    1}
                                                            </p>

                                                            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-black/40">
                                                                {
                                                                    section.type
                                                                }
                                                            </p>
                                                        </div>

                                                    </div>

                                                    {/* SECTION ACTIONS */}
                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            disabled={
                                                                saving ||
                                                                editingSection !==
                                                                    null ||
                                                                index ===
                                                                    0
                                                            }
                                                            onClick={() =>
                                                                handleReorderSection(
                                                                    section.id,
                                                                    "UP"
                                                                )
                                                            }
                                                            className="size-8 cursor-pointer text-black/40 hover:bg-[#F5F2EC] hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                                                        >
                                                            <ArrowUp className="size-4" />

                                                            <span className="sr-only">
                                                                Pindahkan ke atas
                                                            </span>
                                                        </Button>

                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            disabled={
                                                                saving ||
                                                                editingSection !==
                                                                    null ||
                                                                index ===
                                                                    detail
                                                                        .sections
                                                                        .length -
                                                                        1
                                                            }
                                                            onClick={() =>
                                                                handleReorderSection(
                                                                    section.id,
                                                                    "DOWN"
                                                                )
                                                            }
                                                            className="size-8 cursor-pointer text-black/40 hover:bg-[#F5F2EC] hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                                                        >
                                                            <ArrowDown className="size-4" />

                                                            <span className="sr-only">
                                                                Pindahkan ke bawah
                                                            </span>
                                                        </Button>

                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            disabled={
                                                                saving ||
                                                                editingSection !==
                                                                    null
                                                            }
                                                            onClick={() =>
                                                                handleEditSection(
                                                                    section
                                                                )
                                                            }
                                                            className="size-8 cursor-pointer text-black/40 hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B] disabled:cursor-not-allowed disabled:opacity-30"
                                                        >
                                                            <Pencil className="size-4" />

                                                            <span className="sr-only">
                                                                Edit section
                                                            </span>
                                                        </Button>

                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            disabled={
                                                                saving ||
                                                                editingSection !==
                                                                    null
                                                            }
                                                            onClick={() =>
                                                                setDeleteSectionId(
                                                                    section.id
                                                                )
                                                            }
                                                            className="size-8 cursor-pointer text-black/40 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                                                        >
                                                            <Trash2 className="size-4" />

                                                            <span className="sr-only">
                                                                Hapus section
                                                            </span>
                                                        </Button>

                                                    </div>
                                                </div>

                                                {section.type ===
                                                    "TEXT" && (
                                                    <div className="mt-4 rounded-lg bg-[#F5F2EC] p-4">

                                                        {section.text ? (
                                                            <div
                                                                className="
                                                                    text-sm
                                                                    leading-relaxed
                                                                    text-black/70

                                                                    [&_p]:mb-3
                                                                    [&_p:last-child]:mb-0

                                                                    [&_strong]:font-semibold
                                                                    [&_em]:italic
                                                                    [&_u]:underline

                                                                    [&_ul]:my-3
                                                                    [&_ul]:ml-5
                                                                    [&_ul]:list-disc

                                                                    [&_ol]:my-3
                                                                    [&_ol]:ml-5
                                                                    [&_ol]:list-decimal

                                                                    [&_li]:mb-1
                                                                "
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        section.text,
                                                                }}
                                                            />
                                                        ) : (
                                                            <p className="text-sm text-black/40">
                                                                -
                                                            </p>
                                                        )}

                                                    </div>
                                                )}

                                                {section.type ===
                                                    "IMAGE" && (
                                                    <div className="mt-4">

                                                        {section.imageUrl ? (
                                                            <img
                                                                src={getStorageUrl(section.imageUrl) ?? ""}
                                                                alt={`Section ${index +1}`}
                                                                className="max-h-72 rounded-lg object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-40 items-center justify-center rounded-lg bg-[#F5F2EC] text-sm text-black/40">
                                                                Tidak ada
                                                                gambar.
                                                            </div>
                                                        )}

                                                    </div>
                                                )}

                                                {section.type ===
                                                    "YOUTUBE" && (
                                                    <div className="mt-4 rounded-lg bg-[#F5F2EC] p-4">

                                                        <p className="break-all text-sm text-black/70">
                                                            {section.youtubeUrl ||
                                                                "-"}
                                                        </p>

                                                    </div>
                                                )}

                                            </div>
                                        )}
                                    </div>
                                );
                            }
                        )}

                        {!editingSection &&
                            (selectedSectionType ? (
                                <NewsSectionForm
                                    newsId={news.id}
                                    initialType={
                                        selectedSectionType
                                    }
                                    onCancel={
                                        handleCancelSectionForm
                                    }
                                    onSuccess={
                                        handleSectionSuccess
                                    }
                                />
                            ) : (
                                <div className="rounded-xl border border-dashed border-black/15 bg-[#F5F2EC]/50 p-5">

                                    <div className="text-center">
                                        <p className="font-semibold text-black">
                                            Tambah Section
                                        </p>

                                        <p className="mt-1 text-sm text-black/40">
                                            Pilih tipe section
                                            yang ingin
                                            ditambahkan.
                                        </p>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

                                        {/* TEXT */}

                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={
                                                !detail.canAddSection
                                            }
                                            onClick={() =>
                                                handleSelectSectionType(
                                                    "TEXT"
                                                )
                                            }
                                            className="h-auto cursor-pointer flex-col gap-1.5 border-black/10 bg-white px-4 py-3 hover:bg-[#F5F2EC]"
                                        >
                                            <Type className="size-5 text-[#FF6B6B]" />

                                            <span className="text-sm font-medium text-black">
                                                Text
                                            </span>

                                            <span className="text-[11px] font-normal text-black/40">
                                                Teks berita
                                            </span>
                                        </Button>

                                        {/* IMAGE */}

                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={
                                                !detail.canAddSection
                                            }
                                            onClick={() =>
                                                handleSelectSectionType(
                                                    "IMAGE"
                                                )
                                            }
                                            className="h-auto cursor-pointer flex-col gap-1.5 border-black/10 bg-white px-4 py-3 hover:bg-[#F5F2EC]"
                                        >
                                            <ImagePlus className="size-5 text-[#FF6B6B]" />

                                            <span className="text-sm font-medium text-black">
                                                Image
                                            </span>

                                            <span className="text-[11px] font-normal text-black/40">
                                                Gambar berita
                                            </span>
                                        </Button>

                                        {/* YOUTUBE */}

                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={
                                                !detail.canAddSection
                                            }
                                            onClick={() =>
                                                handleSelectSectionType(
                                                    "YOUTUBE"
                                                )
                                            }
                                            className="h-auto cursor-pointer flex-col gap-1.5 border-black/10 bg-white px-4 py-3 hover:bg-[#F5F2EC]"
                                        >
                                            <Link className="size-5 text-[#FF6B6B]" />

                                            <span className="text-sm font-medium text-black">
                                                URL
                                            </span>

                                            <span className="text-[11px] font-normal text-black/40">
                                                Video YouTube
                                            </span>
                                        </Button>

                                    </div>

                                    {!detail.canAddSection && (
                                        <p className="mt-4 text-center text-xs text-black/40">
                                            Jumlah section sudah
                                            mencapai batas
                                            maksimum.
                                        </p>
                                    )}

                                </div>
                            ))}

                    </div>
                </CardContent>
            </Card>

            <AlertDialog
                open={
                    deleteSectionId !== null
                }
                onOpenChange={(open) => {
                    if (
                        !open &&
                        !saving
                    ) {
                        setDeleteSectionId(
                            null
                        );
                    }
                }}
            >
                <AlertDialogContent className="border-0 bg-[#FFFDF7]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">
                            Hapus Section?
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-black/60">
                            Apakah kamu yakin ingin
                            menghapus section ini?
                            Data section yang sudah
                            dihapus tidak dapat
                            dikembalikan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={saving}
                            className="cursor-pointer bg-[#FFFDF7] text-black hover:bg-[#F5F2EC] hover:text-black"
                        >
                            No
                        </AlertDialogCancel>

                        <AlertDialogAction
                            disabled={saving}
                            className="cursor-pointer bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                            onClick={(event) => {
                                event.preventDefault();

                                handleDeleteSection();
                            }}
                        >
                            {saving
                                ? "Menghapus..."
                                : "Yes"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}