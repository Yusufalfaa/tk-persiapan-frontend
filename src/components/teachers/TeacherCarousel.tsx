"use client";

import Autoplay from "embla-carousel-autoplay";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import TeacherCard from "@/components/teachers/teacher-card";

import type { Teacher } from "@/types/teacher";

interface Props {
    teachers: Teacher[];
}

export default function TeachersCarousel({
    teachers,
}: Props) {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 2000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                }),
            ]}
            className="mt-10"
        >
            <CarouselContent>
                {teachers.map((teacher) => (
                    <CarouselItem
                        key={teacher.id}
                        className="md:basis-1/3 lg:basis-1/4"
                    >
                        <TeacherCard
                            teacher={teacher}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}