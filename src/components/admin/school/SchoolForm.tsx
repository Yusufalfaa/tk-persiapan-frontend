"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
    updateSchool,
} from "@/services/school.service";

import type {
    School,
    UpdateSchoolRequest,
} from "@/types/school";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Props {
    school: School;
    onCancel: () => void;
    onSuccess: (school: School) => void;
}

export default function SchoolForm({
    school,
    onCancel,
    onSuccess,
}: Props) {
    const [name, setName] = useState("");
    const [vision, setVision] = useState("");
    const [address, setAddress] = useState("");
    
    const [googleMapsUrl, setGoogleMapsUrl] =
        useState("");

    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const [missions, setMissions] = useState<string[]>(
        []
    );

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(school.name);
        setVision(school.vision);
        setAddress(school.address);

        setGoogleMapsUrl(school.googleMapsUrl);
        setPhone(school.phone);
        setEmail(school.email);
        setInstagramUrl(school.instagramUrl);
        setVideoUrl(school.videoUrl);

        setMissions(
            school.missions
                .sort((a, b) => a.order - b.order)
                .map((mission) => mission.content)
        );
    }, [school]);

    function handleMissionChange(
        index: number,
        value: string
    ) {
        setMissions((current) =>
            current.map((mission, missionIndex) =>
                missionIndex === index
                    ? value
                    : mission
            )
        );
    }

    function handleAddMission() {
        setMissions((current) => [
            ...current,
            "",
        ]);
    }

    function handleRemoveMission(index: number) {
        setMissions((current) =>
            current.filter(
                (_, missionIndex) =>
                    missionIndex !== index
            )
        );
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!name.trim()) {
            toast.error("Nama sekolah belum diisi");
            return;
        }

        if (!vision.trim()) {
            toast.error("Visi belum diisi");
            return;
        }

        if (!address.trim()) {
            toast.error("Alamat belum diisi");
            return;
        }

        if (!email.trim()) {
            toast.error("Email belum diisi");
            return;
        }

        const cleanedMissions = missions
            .map((mission) => mission.trim())
            .filter(Boolean);

        try {
            setLoading(true);

            const request: UpdateSchoolRequest = {
                name: name.trim(),
                vision: vision.trim(),
                address: address.trim(),
                googleMapsUrl:
                    googleMapsUrl.trim(),
                phone: phone.trim(),
                email: email.trim(),
                instagramUrl: instagramUrl.trim(),
                videoUrl: videoUrl.trim(),

                missions: cleanedMissions.map(
                    (content) => ({
                        content,
                    })
                ),
            };

            const updatedSchool =
                await updateSchool(request);

            toast.success(
                "Profil sekolah berhasil diperbarui",
                {
                    description:
                        "Data profil sekolah berhasil disimpan.",
                }
            );

            onSuccess(updatedSchool);
        } catch (error) {
            console.error(
                "Failed to update school:",
                error
            );

            toast.error(
                "Gagal memperbarui profil sekolah",
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
                    Edit Profil Sekolah
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    {/* Identitas */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                                Identitas Sekolah
                            </h3>
                        </div>

                        {/* Nama */}
                        <div className="space-y-2">
                            <Label htmlFor="school-name">
                                Nama Sekolah
                            </Label>

                            <Input
                                id="school-name"
                                value={name}
                                onChange={(event) =>
                                    setName(
                                        event.target.value
                                    )
                                }
                                disabled={loading}
                                className="bg-white"
                            />
                        </div>

                        {/* Alamat */}
                        <div className="space-y-2">
                            <Label htmlFor="school-address">
                                Alamat
                            </Label>

                            <Textarea
                                id="school-address"
                                value={address}
                                onChange={(event) =>
                                    setAddress(
                                        event.target.value
                                    )
                                }
                                disabled={loading}
                                className="min-h-24 resize-none bg-white"
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="school-phone">
                                    Telepon
                                </Label>

                                <Input
                                    id="school-phone"
                                    value={phone}
                                    onChange={(event) =>
                                        setPhone(
                                            event.target.value
                                        )
                                    }
                                    disabled={loading}
                                    className="bg-white"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="school-email">
                                    Email
                                </Label>

                                <Input
                                    id="school-email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }
                                    disabled={loading}
                                    className="bg-white"
                                />
                            </div>

                            {/* Instagram */}
                            <div className="space-y-2">
                                <Label htmlFor="school-instagram">
                                    Instagram
                                </Label>

                                <Input
                                    id="school-instagram"
                                    type="url"
                                    value={instagramUrl}
                                    onChange={(event) =>
                                        setInstagramUrl(event.target.value)
                                    }
                                    placeholder="https://instagram.com/..."
                                    disabled={loading}
                                    className="bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Visi */}
                    <div className="space-y-4 border-t border-black/10 pt-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                            Visi
                        </h3>

                        <Textarea
                            value={vision}
                            onChange={(event) =>
                                setVision(
                                    event.target.value
                                )
                            }
                            disabled={loading}
                            className="min-h-28 resize-none bg-white"
                        />
                    </div>

                    {/* Misi */}
                    <div className="space-y-4 border-t border-black/10 pt-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                                Misi
                            </h3>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={
                                    handleAddMission
                                }
                                disabled={loading}
                                className="cursor-pointer gap-2"
                            >
                                <Plus className="size-4" />
                                Tambah Misi
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {missions.length === 0 ? (
                                <div className="rounded-md border border-dashed border-black/10 p-6 text-center text-sm text-black/40">
                                    Belum ada misi.
                                </div>
                            ) : (
                                missions.map(
                                    (
                                        mission,
                                        index
                                    ) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#F5F2EC] text-sm font-medium text-black/50">
                                                {index +
                                                    1}
                                            </div>

                                            <Textarea
                                                value={
                                                    mission
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    handleMissionChange(
                                                        index,
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                disabled={
                                                    loading
                                                }
                                                placeholder={`Misi ${index + 1}`}
                                                className="min-h-10 resize-none bg-white"
                                            />

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleRemoveMission(
                                                        index
                                                    )
                                                }
                                                disabled={
                                                    loading
                                                }
                                                className="shrink-0 cursor-pointer text-black/40 hover:bg-red-50 hover:text-red-500"
                                            >
                                                <Trash2 className="size-4" />

                                                <span className="sr-only">
                                                    Hapus
                                                    misi{" "}
                                                    {index +
                                                        1}
                                                </span>
                                            </Button>
                                        </div>
                                    )
                                )
                            )}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-6 border-t border-black/10 pt-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                            Lokasi
                        </h3>


                        {/* Google Maps */}
                        <div className="space-y-2">
                            <Label htmlFor="school-maps">
                                Google Maps URL
                            </Label>

                            <Input
                                id="school-maps"
                                type="url"
                                value={googleMapsUrl}
                                onChange={(event) =>
                                    setGoogleMapsUrl(
                                        event.target
                                            .value
                                    )
                                }
                                disabled={loading}
                                className="bg-white"
                            />
                        </div>
                    </div>

                    {/* Video */}
                    <div className="space-y-4 border-t border-black/10 pt-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                            Video Profile
                        </h3>

                        <div className="space-y-2">
                            <Label htmlFor="school-video">
                                Video URL
                            </Label>

                            <Input
                                id="school-video"
                                type="url"
                                value={videoUrl}
                                onChange={(event) =>
                                    setVideoUrl(
                                        event.target
                                            .value
                                    )
                                }
                                disabled={loading}
                                className="bg-white"
                            />
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
                                ? "Menyimpan..."
                                : "Simpan Perubahan"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}