import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { getTeachers } from "@/services/teacher.service";
import TeacherCard from "@/components/teachers/teacher-card";

export default async function TeachersSection() {
    const response = await getTeachers();

    const teachers = response.data;

    return (
        <section id="teachers" className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="text-center text-3xl font-bold">
                    Guru Kami
                </h2>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
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
            </div>
        </section>
    );
}