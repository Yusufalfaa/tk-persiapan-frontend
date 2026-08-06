import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getTeachers } from "@/services/teacher.service";

import { UserRound } from "lucide-react";

export default async function Teachers() {
  const teachers = await getTeachers();

  return (
    <section id="teachers" className="py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-3xl font-bold">
          Guru Kami
        </h2>

        <Carousel
          opts={{
            align: "start",
          }}
          className="mt-10"
        >
          <CarouselContent>
            {teachers.map((teacher: any) => (
              <CarouselItem
                key={teacher.id}
                className="md:basis-1/3 lg:basis-1/4"
              >
                <div className="rounded-xl border p-4">

                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                    {teacher.photoUrl ? (
                      <img
                        src={teacher.photoUrl}
                        alt={teacher.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <UserRound className="h-20 w-20 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <h3 className="mt-4 text-center font-semibold">
                    {teacher.name}
                  </h3>

                  <p className="text-center text-sm text-muted-foreground">
                    {teacher.position}
                  </p>

                </div>
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