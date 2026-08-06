import { getSchoolProfile } from "@/services/school.service";


export default async function VideoProfileSection() {

  const school = await getSchoolProfile();


  if (!school.videoUrl) {
    return null;
  }


  return (
    <section
      className="py-20"
      id="video-profile"
    >

      <div className="mx-auto max-w-5xl px-6">


        <h2 className="text-center text-3xl font-bold">
          Video Profil Sekolah
        </h2>


        <div
          className="
            mt-10
            aspect-video
            overflow-hidden
            rounded-2xl
            shadow
          "
        >

          <iframe
            src={convertYoutubeUrl(
              school.videoUrl
            )}
            className="
              h-full
              w-full
            "
            allowFullScreen
          />

        </div>


      </div>

    </section>
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