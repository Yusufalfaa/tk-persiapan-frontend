import { getSchoolProfile } from "@/services/school.service";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { 
  RiInstagramLine 
} from "react-icons/ri";


export default async function ContactSection() {

  const school = await getSchoolProfile();


  return (
    <section
      id="contact"
      className="py-20"
    >

      <div className="mx-auto max-w-7xl px-6">


        <h2 className="text-center text-3xl font-bold">
          Kontak Kami
        </h2>


        <div className="mt-10 grid gap-8 md:grid-cols-2">


          {/* Contact Info */}
          <div className="space-y-6">


            <div className="flex gap-4">

              <MapPin
                className="mt-1 h-6 w-6"
              />

              <div>

                <h3 className="font-semibold">
                  Alamat
                </h3>

                <p className="text-muted-foreground">
                  {school.address}
                </p>

              </div>

            </div>



            {school.phone && (

              <div className="flex gap-4">

                <Phone
                  className="h-6 w-6"
                />

                <div>

                  <h3 className="font-semibold">
                    Telepon
                  </h3>

                  <p className="text-muted-foreground">
                    {school.phone}
                  </p>

                </div>

              </div>

            )}



            {school.email && (

              <div className="flex gap-4">

                <Mail
                  className="h-6 w-6"
                />

                <div>

                  <h3 className="font-semibold">
                    Email
                  </h3>

                  <p className="text-muted-foreground">
                    {school.email}
                  </p>

                </div>

              </div>

            )}

            {school.instagramUrl && (

            <div className="flex gap-4">

              <RiInstagramLine
                className="h-6 w-6"
              />

              <div>

                <h3 className="font-semibold">
                  Instagram
                </h3>


                <a
                  href={school.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-muted-foreground
                    hover:underline
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
              overflow-hidden
              rounded-xl
              border
            "
          >

            {school.googleMapsUrl ? (

              <iframe
                src={school.googleMapsUrl}
                className="h-[350px] w-full"
                loading="lazy"
              />

            ) : (

              <div className="
                flex
                h-[350px]
                items-center
                justify-center
              ">
                Map tidak tersedia
              </div>

            )}

          </div>


        </div>


      </div>

    </section>
  );
}