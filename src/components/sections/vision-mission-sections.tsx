import { getSchool } from "@/services/school.service";

export default async function VisionMissionSection() {
  const response = await getSchool();

  const school = response;

  return (
    <>
      {/* Top Wave */}
      <svg
        className="
          block
          h-[70px]
          w-full
          -mb-0
          -mt-[2px]
          scale-y-[-1]
        "
        viewBox="0 0 1200 70"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C300,90 900,-10 1200,40 L1200,70 L0,70 Z"
          fill="#DFF6E3"
        />
      </svg>

      {/* Visi Misi */}
      <section
        id="visi-misi"
        className="
          relative
          overflow-hidden
          bg-[#DFF6E3]
          py-[70px]
          pb-[76px]
        "
      >
        {/* Blob */}
        <div
          className="
            absolute
            right-[-40px]
            top-[-60px]
            z-0
            h-[220px]
            w-[220px]
            rounded-full
            bg-[#5FCB7A]
            opacity-50
            blur-[2px]
          "
        />

        {/* Container */}
        <div
          className="
            relative
            mx-auto
            max-w-[1100px]
            px-8
          "
        >
          {/* Section Kicker */}
          <div
            className="
              relative
              z-[1]
              mb-2
              text-[16px]
              font-extrabold
              uppercase
              tracking-[1.5px]
              text-[#2E8F47]
            "
          >
            Arah & Langkah Kami
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
            Visi & Misi
          </h2>

          {/* VM Grid */}
          <div
            className="
              mt-5
              grid
              items-start
              gap-[22px]
              md:grid-cols-[0.8fr_1.2fr]
            "
          >
            {/* Visi */}
            <div
              className="
                h-full
                rounded-[24px]
                bg-[#FF6B6B]
                px-7
                py-[30px]
                text-[14px]
                leading-[1.8]
                text-white
                shadow-[0_16px_30px_rgba(255,107,107,0.28)]
              "
            >
              <h3
                className="
                  mb-[10px]
                  text-[18px]
                  font-semibold
                  tracking-[0.2px]
                  text-white
                "
              >
                Visi
              </h3>

              {school.vision}
            </div>

            {/* Misi */}
            <div className="flex flex-col gap-[14px]">
              {school.missions.map((mission: any, index: number) => (
                <div
                  key={mission.id}
                  className="
                    flex
                    gap-[14px]
                    rounded-[16px]
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
                      tracking-[0.2px]
                      text-[#5FCB7A]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{mission.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}