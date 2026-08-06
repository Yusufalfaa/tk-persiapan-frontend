import { getNewsDetail } from "@/services/news.service";

export default async function NewsDetail({params,}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const response = await getNewsDetail(slug);

  if (!response) {
    return (
      <div className="py-20 text-center">
        Berita tidak ditemukan
      </div>
    );
  }

  const news = response;

  return (
    <article className="py-20">

      <div className="mx-auto max-w-4xl px-6">

        <h1 className="text-4xl font-bold">
          {news.title}
        </h1>


        <p className="mt-3 text-sm text-muted-foreground">
          {new Date(news.createdAt).toLocaleDateString(
            "id-ID"
          )}
        </p>


        <div className="mt-10 space-y-8">

          {news.sections.map((section: any) => (

            <div key={section.id}>


              {/* TEXT */}
              {section.type === "TEXT" && (
                <p className="leading-relaxed text-muted-foreground">
                  {section.text}
                </p>
              )}


              {/* IMAGE */}
              {section.type === "IMAGE" &&  section.imageUrl && (
                <div className="relative aspect-video overflow-hidden rounded-xl">

                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${section.imageUrl}`}
                    alt={news.title}
                    className="h-full w-full object-cover"
                  />

                </div>
              )}


              {/* YOUTUBE */}
              {section.type === "YOUTUBE" && (
                <div className="aspect-video">

                  <iframe
                    src={convertYoutubeUrl(section.youtubeUrl)}
                    className="h-full w-full rounded-xl"
                    allowFullScreen
                  />

                </div>
              )}


            </div>

          ))}

        </div>

      </div>

    </article>
  );
}


function convertYoutubeUrl(url: string) {
  const videoId = new URL(url).searchParams.get("v");

  return `https://www.youtube.com/embed/${videoId}`;
}