import { getSchool } from "@/services/school.service";

export default async function VideoProfileSection() {
  const school = await getSchool();

  if (!school.videoUrl) {
    return null;
  }

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
          d="M0,40 C300,-10 900,90 1200,40 L1200,70 L0,70 Z"
          fill="#D9F2FF"
        />
      </svg>

      {/* Video Profil */}
      <section
        id="video"
        className="
          relative
          overflow-hidden
          bg-[#D9F2FF]
          py-[70px]
          pb-[76px]
        "
      >
        {/* Blob */}
        <div
          className="
            absolute
            bottom-[-60px]
            left-[-40px]
            z-0
            h-[260px]
            w-[260px]
            rounded-full
            bg-[#5EC8F2]
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
              text-[#0D7BB0]
            "
          >
            Kenali Kami Lebih Dekat
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
            Video Profil TK Persiapan
          </h2>

          {/* Section Subtitle */}
          <p
            className="
              relative
              z-[1]
              mx-auto
              max-w-[480px]
              text-[14px]
              text-[#2B5D75]
            "
          >
            Simak keseharian belajar dan bermain anak-anak di TK Persiapan.
          </p>

          {/* Video Frame */}
          <div
            className="
              mx-auto
              mt-6
              max-w-[720px]
              rounded-[24px]
              bg-white
              p-[10px]
              shadow-[0_16px_34px_rgba(20,90,120,0.16)]
            "
          >
            {/* Video Aspect */}
            <div
              className="
                relative
                w-full
                overflow-hidden
                rounded-[16px]
                bg-black
                pt-[56.25%]
              "
            >
              <iframe
                src={convertYoutubeUrl(school.videoUrl)}
                title="Video Profil TK Persiapan"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  border-0
                "
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share
                "
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function convertYoutubeUrl(url: string) {
  const parsed = new URL(url);

  if (parsed.pathname.startsWith("/embed/")) {
    return url;
  }

  if (parsed.hostname.includes("youtu.be")) {
    const videoId = parsed.pathname.slice(1);

    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (parsed.hostname.includes("youtube.com")) {
    const videoId = parsed.searchParams.get("v");

    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url;
}