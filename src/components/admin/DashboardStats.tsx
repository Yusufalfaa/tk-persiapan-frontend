"use client";

import { useEffect, useState } from "react";

import {
    ShieldCheck,
    Users,
    Newspaper,
    CircleCheck,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    getDashboardStats,
} from "@/services/dashboard.service";

import { DashboardStat } from "@/types/dashboard";


export default function DashboardStats() {
    const [stats, setStats] = useState<DashboardStat | null>(null);

    useEffect(() => {
        async function loadStats() {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to load dashboard stats:", error);
            }
        }

        loadStats();
    }, []);

    if (!stats) {
        return (
            <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                    <Card
                        key={item}
                        className="border-0 bg-[#FFFDF7]"
                    >
                        <CardContent className="p-6">
                            <div className="h-20 animate-pulse rounded-md bg-muted" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const statItems = [
        {
            title: "Total Admin",
            value: stats.totalAdmin,
            icon: ShieldCheck,
        },
        {
            title: "Total Guru",
            value: stats.totalTeachers,
            icon: Users,
        },
        {
            title: "Total Berita",
            value: stats.totalNews,
            icon: Newspaper,
        },
        {
            title: "Berita Published",
            value: stats.publishedNews,
            icon: CircleCheck,
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-6">
            {statItems.map((stat) => {
                const Icon = stat.icon;

                return (
                    <Card
                        key={stat.title}
                        className="border-0 bg-[#FFFDF7]"
                    >
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-black">
                                {stat.title}
                            </CardTitle>

                            <Icon className="size-6 text-[#FF6B6B]/80" />
                        </CardHeader>

                        <CardContent>
                            <p className="text-4xl font-bold text-[#FF6B6B]/80">
                                {stat.value}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}