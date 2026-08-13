import { getSchool } from "@/services/school.service";

export default async function VisionMissionSection() {
  const response = await getSchool();

  const school = response;

  return (
    <section
      id="visi-misi"
      className="bg-[#DFF6E3] py-[70px] pb-[76px]"
    >
      <div className="mx-auto max-w-[1100px] px-8">

        {/* Header */}
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.5px] text-[#2E8F47]">
          Arah & Langkah Kami
        </div>

        <h2 className="text-[29px] font-bold tracking-[0.2px] text-[#241E3D]">
          Visi & Misi
        </h2>

        {/* Content */}
        <div className="mt-5 grid items-start gap-[22px] md:grid-cols-[0.8fr_1.2fr]">

          {/* Vision */}
          <div
            className="
              h-full
              rounded-[24px]
              bg-[#FF6B6B]
              px-7
              py-[30px]
              text-white
              shadow-[0_16px_30px_rgba(255,107,107,0.28)]
            "
          >
            <h3 className="mb-[10px] text-[18px] font-bold text-white">
              Visi
            </h3>

            <p className="text-[14px] leading-[1.8] text-white">
              {school.vision}
            </p>
          </div>

          {/* Mission */}
          <div className="flex flex-col gap-[14px]">
            {school.missions.map((mission: any, index: number) => (
              <div
                key={mission.id}
                className="
                  flex
                  gap-[14px]
                  rounded-2xl
                  bg-white
                  px-[22px]
                  py-[18px]
                  text-[13.5px]
                  leading-[1.7]
                  text-[#3A3A3A]
                  shadow-[0_8px_20px_rgba(40,90,50,0.07)]
                "
              >
                <span
                  className="
                    shrink-0
                    text-[18px]
                    font-bold
                    text-[#5FCB7A]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>
                  {mission.content}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}