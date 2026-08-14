import { getTeachers } from "@/services/teacher.service";
import TeachersCarousel from "../teachers/TeacherCarousel";

export default async function TeachersSection() {
  const response = await getTeachers();

  return (
    <section
      id="guru"
      className="
        scroll-mt-[80px]
        bg-[#FFFDF7]
        px-8
        py-[76px]
        pb-20
      "
    >
      <div
        className="
          mx-auto
          max-w-[1100px]
          text-center
        "
      >
        {/* Section Kicker */}
        <div
          className="
            relative
            z-[1]
            mb-2
            text-[18px]
            font-extrabold
            uppercase
            tracking-[1.5px]
            text-[#FF6B6B]
          "
        >
          Tenaga Pengajar
        </div>

        {/* Section Title */}
        <h2
          className="
            relative
            z-[1]
            mb-[10px]
            text-[32px]
            font-semibold
            tracking-[0.2px]
            text-[#241E3D]
          "
        >
          Guru-Guru Kami
        </h2>

        {/* Section Subtitle */}
        <p
          className="
            relative
            z-[1]
            mx-auto
            max-w-[480px]
            text-[14px]
            text-[#7C7A74]
          "
        >
          Dibimbing oleh guru-guru yang berpengalaman dan penuh kasih sayang.
        </p>

        {/* Teacher Carousel */}
        <div className="relative mt-[10px]">
          <TeachersCarousel teachers={response.data} />
        </div>
      </div>
    </section>
  );
}