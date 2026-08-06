import Image from "next/image";
import { getSchoolProfile } from "@/services/school.service";

export default async function Profile() {
  const response = await getSchoolProfile();
  const school = response;

  return (
    <section
      id="profile"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-10 md:grid-cols-2">

          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold">
              {school.name}
            </h2>

            <p className="mt-5 leading-relaxed text-muted-foreground">
              TK Persiapan Cipinang Besar Selatan merupakan lembaga
              pendidikan anak usia dini yang berkomitmen memberikan
              pendidikan terbaik dengan lingkungan belajar yang nyaman,
              kreatif, dan menyenangkan.
            </p>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Kami mendampingi anak-anak dalam mengembangkan potensi,
              kreativitas, serta membangun karakter positif sejak dini.
            </p>
          </div>


          {/* Image */}
          <div className="overflow-hidden rounded-2xl">
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