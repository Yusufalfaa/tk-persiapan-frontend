import { UserRound } from "lucide-react";
import type { Teacher } from "@/types/teacher";


interface Props {
  teacher: Teacher;
}


export default function TeacherCard({
  teacher,
}: Props) {

  return (
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
            <UserRound
              className="h-20 w-20 text-gray-400"
            />
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
  );
}