import { getSchool } from "@/services/school.service";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import {
  RiInstagramLine,
} from "react-icons/ri";

export default async function ContactSection() {
  const school = await getSchool();

  return (
    <section
      id="kontak"
      className="
        scroll-mt-[80px]
        bg-[#FFFDF7]
        px-8
        py-[76px]
        pb-20
      "
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Section Kicker */}
        <div
          className="
            mb-2
            text-[16px]
            font-extrabold
            uppercase
            tracking-[1.5px]
            text-[#FF6B6B]
          "
        >
          Hubungi Kami
        </div>

        {/* Section Title */}
        <h2
          className="
            text-[32px]
            font-semibold
            tracking-[0.2px]
            text-[#241E3D]
          "
        >
          Kontak Kami
        </h2>

        {/* Contact Grid */}
        <div
          className="
            mt-6
            grid
            items-stretch
            gap-[50px]
            md:grid-cols-[0.85fr_1.15fr]
          "
        >
          {/* Contact Information */}
          <div>
            {/* Alamat */}
            <div
              className="
                flex
                gap-4
                border-b
                border-[#EAE5DA]
                py-4
                pt-0
              "
            >
              <MapPin
                className="
                  mt-0.5
                  h-5
                  w-5
                  shrink-0
                  text-[#FF6B6B]
                "
              />

              <div>
                <div
                  className="
                    mb-1
                    font-semibold
                    text-[14px]
                    text-[#FF6B6B]
                  "
                >
                  Alamat
                </div>

                <div
                  className="
                    text-[13.5px]
                    leading-[1.6]
                    text-[#3A3A3A]
                  "
                >
                  {school.address}
                </div>
              </div>
            </div>

            {/* Telepon */}
            {school.phone && (
              <div
                className="
                  flex
                  gap-4
                  border-b
                  border-[#EAE5DA]
                  py-4
                "
              >
                <Phone
                  className="
                    mt-0.5
                    h-5
                    w-5
                    shrink-0
                    text-[#FF6B6B]
                  "
                />

                <div>
                  <div
                    className="
                      mb-1
                      font-semibold
                      text-[14px]
                      text-[#FF6B6B]
                    "
                  >
                    Telepon
                  </div>

                  <a
                    href={`https://wa.me/${school.phone.replace(/\D/g, "").replace(/^0/, "62")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-[13.5px]
                      leading-[1.6]
                      text-[#3A3A3A]
                      transition-colors
                      hover:text-[#FF6B6B]
                    "
                  >
                    {school.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Email */}
            {school.email && (
              <div
                className="
                  flex
                  gap-4
                  border-b
                  border-[#EAE5DA]
                  py-4
                "
              >
                <Mail
                  className="
                    mt-0.5
                    h-5
                    w-5
                    shrink-0
                    text-[#FF6B6B]
                  "
                />

                <div>
                  <div
                    className="
                      mb-1
                      font-semibold
                      text-[14px]
                      text-[#FF6B6B]
                    "
                  >
                    Email
                  </div>

                  <a
                    href={`mailto:${school.email}`}
                    className="
                      text-[13.5px]
                      leading-[1.6]
                      text-[#3A3A3A]
                      transition-colors
                      hover:text-[#FF6B6B]
                    "
                  >
                    {school.email}
                  </a>
                </div>
              </div>
            )}

            {/* Instagram */}
            {school.instagramUrl && (
              <div
                className="
                  flex
                  gap-4
                  border-b
                  border-[#EAE5DA]
                  py-4
                "
              >
                <RiInstagramLine
                  className="
                    mt-0.5
                    h-5
                    w-5
                    shrink-0
                    text-[#FF6B6B]
                  "
                />

                <div>
                  <div
                    className="
                      mb-1
                      font-semibold
                      text-[14px]
                      text-[#FF6B6B]
                    "
                  >
                    Instagram
                  </div>

                  <a
                    href={school.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-[13.5px]
                      leading-[1.6]
                      text-[#3A3A3A]
                      transition-colors
                      hover:text-[#FF6B6B]
                    "
                  >
                    {school.instagramUrl}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Map */}
          <div
            className="
              h-full
              min-h-[320px]
              overflow-hidden
              rounded-[24px]
              border-[1.5px]
              border-[#EAE5DA]
            "
          >
            {school.googleMapsUrl ? (
              <iframe
                src={school.googleMapsUrl}
                title="Lokasi TK Persiapan"
                className="
                  block
                  h-full
                  min-h-[320px]
                  w-full
                  border-0
                "
                loading="lazy"
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  min-h-[320px]
                  items-center
                  justify-center
                  bg-[#F4F2EB]
                  text-[13px]
                  text-[#7C7A74]
                "
              >
                Map tidak tersedia
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}