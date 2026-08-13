import Image from "next/image";
import { getSchool } from "@/services/school.service";

export default async function ProfileSection() {
  const response = await getSchool();
  const school = response;

  return (
    <section
      id="profile"
      className="bg-[#FFFDF7] py-[76px]"
    >
      <div className="mx-auto max-w-7xl px-8">

        <div className="grid items-center gap-[52px] md:grid-cols-2">

          {/* Text */}
          <div>
            <div
              className="
                mb-2
                text-[18px]
                font-extrabold
                uppercase
                tracking-[1.5px]
                text-[#FF6B6B]
              "
            >
              Tentang Kami
            </div>

            <h2
              className="
                mb-[10px]
                text-[32px]
                font-bold
                leading-tight
                tracking-[0.2px]
                text-[#241E3D]
              "
            >
              Mengenal {school.name}
            </h2>

            <p
              className="
                mb-4
                max-w-[520px]
                text-[14px]
                leading-[1.85]
                text-[#4A4A4A]
              "
            >
              TK Persiapan Cipinang Besar Selatan merupakan lembaga
              pendidikan anak usia dini yang berkomitmen memberikan
              pendidikan terbaik dengan lingkungan belajar yang nyaman,
              kreatif, dan menyenangkan.
            </p>

            <p
              className="
                mb-4
                max-w-[520px]
                text-[14px]
                leading-[1.85]
                text-[#4A4A4A]
              "
            >
              Kami mendampingi anak-anak dalam mengembangkan potensi,
              kreativitas, serta membangun karakter positif sejak dini.
            </p>

            {/* Facts */}
            <div className="mt-[22px] flex gap-[26px]">
              <div>
                <div className="text-[22px] font-bold text-[#FF6B6B]">
                  2010
                </div>

                <div className="text-[11.5px] text-[#7C7A74]">
                  Tahun Berdiri
                </div>
              </div>

              <div>
                <div className="text-[22px] font-bold text-[#FF6B6B]">
                  7
                </div>

                <div className="text-[11.5px] text-[#7C7A74]">
                  Guru Pengajar
                </div>
              </div>

              <div>
                <div className="text-[22px] font-bold text-[#FF6B6B]">
                  500+
                </div>

                <div className="text-[11.5px] text-[#7C7A74]">
                  Alumni
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-[24px] border-[6px] border-[#FFF3D0]">
            <Image
              src="/images/hero.png"
              alt="TK Persiapan"
              width={600}
              height={450}
              className="aspect-[4/3] object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}