export default function ExtrasSection() {
  return (
    <>
      {/* Top Wave */}
      <svg
        className="
          block
          h-[70px]
          w-full
          -mt-[2px]
          scale-y-[-1]
        "
        viewBox="0 0 1200 70"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C300,90 900,-10 1200,40 L1200,70 L0,70 Z"
          fill="#FFF3D0"
        />
      </svg>

      {/* Ekstrakurikuler */}
      <section
        id="ekskul"
        className="
          scroll-mt-[180px]
          relative
          overflow-hidden
          bg-[#FFF3D0]
          py-[76px]
          pb-20
        "
      >
        {/* Blob */}
        <div
          className="
            absolute
            left-[-40px]
            top-[-40px]
            z-0
            h-[200px]
            w-[200px]
            rounded-full
            bg-[#FFCF3F]
            opacity-50
            blur-[2px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1100px]
            px-8
            text-center
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
              text-[#A3780A]
            "
          >
            Kegiatan Seru
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
            Ekstrakurikuler
          </h2>

          {/* Section Subtitle */}
          <p
            className="
              relative
              z-[1]
              mx-auto
              max-w-[480px]
              text-[14px]
              text-[#8A6D20]
            "
          >
            Beragam kegiatan untuk mengembangkan bakat dan minat anak.
          </p>

          {/* Activity Grid */}
          <div
            className="
              mt-[10px]
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {/* Activity 1 */}
            <div className="text-center">
              <div
                className="
                  mb-3
                  h-[160px]
                  rounded-[24px]
                  bg-[#E2DED2]
                  transition-transform
                  duration-200
                  hover:scale-[1.035]
                "
              >
                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.5px]
                    text-[#9A968A]
                  "
                >
                  Foto
                </div>
              </div>

              <div
                className="
                  text-[14px]
                  font-normal
                  tracking-[0.2px]
                  text-[#241E3D]
                "
              >
                Menari Tradisional
              </div>
            </div>

            {/* Activity 2 */}
            <div className="text-center">
              <div
                className="
                  mb-3
                  h-[160px]
                  rounded-[24px]
                  bg-[#E2DED2]
                  transition-transform
                  duration-200
                  hover:scale-[1.035]
                "
              >
                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.5px]
                    text-[#9A968A]
                  "
                >
                  Foto
                </div>
              </div>

              <div
                className="
                  text-[14px]
                  font-normal
                  tracking-[0.2px]
                  text-[#241E3D]
                "
              >
                Musik & Vokal
              </div>
            </div>

            {/* Activity 3 */}
            <div className="text-center">
              <div
                className="
                  mb-3
                  h-[160px]
                  rounded-[24px]
                  bg-[#E2DED2]
                  transition-transform
                  duration-200
                  hover:scale-[1.035]
                "
              >
                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.5px]
                    text-[#9A968A]
                  "
                >
                  Foto
                </div>
              </div>

              <div
                className="
                  text-[14px]
                  font-normal
                  tracking-[0.2px]
                  text-[#241E3D]
                "
              >
                Renang
              </div>
            </div>

            {/* Activity 4 */}
            <div className="text-center">
              <div
                className="
                  mb-3
                  h-[160px]
                  rounded-[24px]
                  bg-[#E2DED2]
                  transition-transform
                  duration-200
                  hover:scale-[1.035]
                "
              >
                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.5px]
                    text-[#9A968A]
                  "
                >
                  Foto
                </div>
              </div>

              <div
                className="
                  text-[14px]
                  font-normal
                  tracking-[0.2px]
                  text-[#241E3D]
                "
              >
                Melukis
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}