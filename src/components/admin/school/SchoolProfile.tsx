"use client";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { School } from "@/types/school";

interface Props {
    school: School;
    onEdit: () => void;
}

export default function SchoolProfile({
    school,
    onEdit,
}: Props) {
    return (
        <Card className="border-0 bg-[#FFFDF7]">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold text-black">
                    Profil Sekolah
                </CardTitle>

                <Button
                    type="button"
                    onClick={onEdit}
                    className="cursor-pointer gap-2 bg-[#FF6B6B]/80 text-white hover:bg-[#FF6B6B]"
                >
                    <Pencil className="size-4" />
                    Edit Profil
                </Button>
            </CardHeader>

            <CardContent>
                <div className="space-y-8">

                    {/* Identitas */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                            Identitas Sekolah
                        </h3>

                        <div className="grid gap-6 md:grid-cols-2">
                            <ProfileItem
                                label="Nama Sekolah"
                                value={school.name}
                            />

                            <ProfileItem
                                label="Telepon"
                                value={school.phone}
                            />

                            <ProfileItem
                                label="Email"
                                value={school.email}
                            />

                            <ProfileItem
                                label="Alamat"
                                value={school.address}
                            />

                            <div className="space-y-1">
                                <p className="text-sm text-black/40">
                                    Instagram
                                </p>

                                {school.instagramUrl ? (
                                    <a
                                        href={school.instagramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="break-all font-medium text-[#FF6B6B] hover:underline"
                                    >
                                        {school.instagramUrl}
                                    </a>
                                ) : (
                                    <p className="font-medium text-black">
                                        -
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Visi */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                            Visi
                        </h3>

                        <p className="leading-relaxed text-black/70">
                            {school.vision}
                        </p>
                    </div>

                    {/* Misi */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                            Misi
                        </h3>

                        <ol className="list-decimal space-y-2 pl-5 text-black/70">
                            {school.missions.map((mission) => (
                                <li key={mission.id}>
                                    {mission.content}
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Location */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                            Lokasi
                        </h3>

                        <div className="rounded-lg bg-[#F5F2EC] px-4 py-3">
                            <p className="break-all text-sm text-black/70">
                                {school.googleMapsUrl || "-"}
                            </p>
                        </div>
                    </div>

                    {/* Video */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-black/40">
                            Video Profile
                        </h3>

                        <a
                            href={school.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="break-all text-sm text-black/70 hover:text-[#FF6B6B] hover:underline"
                        >
                            {school.videoUrl}
                        </a>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}

function ProfileItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="space-y-1">
            <p className="text-sm text-black/40">
                {label}
            </p>

            <p className="font-medium text-black">
                {value || "-"}
            </p>
        </div>
    );
}