import { UserRound } from "lucide-react";
import type { Teacher } from "@/types/teacher";
import { getStorageUrl } from "@/lib/storage-url";

interface Props {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: Props) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-[#E8E1D5]
        bg-white
        p-4
        shadow-[0_6px_20px_rgba(36,30,61,0.06)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_28px_rgba(36,30,61,0.10)]
      "
    >
      {/* Photo */}
      <div
        className="
          relative
          aspect-[3/4]
          overflow-hidden
          rounded-xl
          bg-[#F3F0E8]
        "
      >
        {teacher.photoUrl ? (
          <img
            src={getStorageUrl(teacher.photoUrl) ?? ""}
            alt={teacher.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.03]
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <UserRound
              className="
                h-20
                w-20
                text-[#241E3D]/20
              "
            />
          </div>
        )}
      </div>

      {/* Information */}
      <div className="px-1 pb-1 pt-4">
        <h3
          className="
            text-center
            font-semibold
            text-[#241E3D]
          "
        >
          {teacher.name}
        </h3>

        <p
          className="
            mt-1
            text-center
            text-sm
            font-medium
            text-[#FF6B6B]
          "
        >
          {teacher.position}
        </p>
      </div>
    </div>
  );
}