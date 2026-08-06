import { getSchoolProfile } from "@/services/school.service";
import { Heart, BookOpen, Users } from "lucide-react";

export default async function VisionMission() {
  const response = await getSchoolProfile();

  const school = response;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Vision */}
        <h2 className="text-center text-3xl font-bold">
          Visi
        </h2>

        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border bg-[#FFF8EE] p-8 text-center">
          <p className="text-muted-foreground">
            {school.vision}
          </p>
        </div>


        {/* Mission */}
        <h2 className="mt-16 text-center text-3xl font-bold">
          Misi
        </h2>


        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {school.missions.map((mission: any, index: number) => (
            <div
              key={mission.id}
              className="rounded-2xl border p-6 text-center"
            >

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF8EE]">
                {index === 0 && <BookOpen />}
                {index === 1 && <Heart />}
                {index === 2 && <Users />}
              </div>


              <p className="mt-5 text-muted-foreground">
                {mission.content}
              </p>

            </div>
          ))}
        </div>


      </div>
    </section>
  );
}