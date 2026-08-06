import type { NewsSection } from "@/types/news";


interface Props {
  section: NewsSection;
  title: string;
}


export default function NewsSectionRenderer({
  section,
  title,
}: Props) {

  return (
    <div>

      {/* TEXT */}
      {section.type === "TEXT" && (
        <p className="leading-relaxed text-muted-foreground">
          {section.text}
        </p>
      )}


      {/* IMAGE */}
      {section.type === "IMAGE" && section.imageUrl && (

        <div className="relative aspect-video overflow-hidden rounded-xl">

          <img
            src={section.imageUrl}
            alt={title}
            className="
              h-full
              w-full
              object-cover
            "
          />

        </div>

      )}


      {/* YOUTUBE */}
      {section.type === "YOUTUBE" && section.youtubeUrl && (

        <div className="aspect-video">

          <iframe
            src={convertYoutubeUrl(section.youtubeUrl)}
            className="
              h-full
              w-full
              rounded-xl
            "
            allowFullScreen
          />

        </div>

      )}

    </div>
  );
}


function convertYoutubeUrl(url: string) {

  const videoId = new URL(url)
    .searchParams
    .get("v");


  return `https://www.youtube.com/embed/${videoId}`;

}