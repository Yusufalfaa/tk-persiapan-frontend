import Link from "next/link";
import { getNews } from "@/services/news.service";

export default async function News() {
  const response = await getNews(1, 3);

  const news = response.data;
  console.log(news);
  return (
    <section
      id="news"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl px-6">


        {/* Header */}
        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Berita Terbaru
          </h2>


          <Link
            href="/berita"
            className="
              rounded-lg
              border
              px-4
              py-2
              text-sm
              font-medium
              transition
              hover:bg-gray-100
            "
          >
            Lihat Semua Berita
          </Link>

        </div>



        {/* News List */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {news.map((item) => (

            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border bg-white"
            >


              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">

                {item.thumbnailUrl ? (

                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                ) : (

                  <div className="flex h-full items-center justify-center bg-gray-100">
                    Tidak ada gambar
                  </div>

                )}

              </div>



              {/* Content */}
              <div className="p-6">

                <p className="text-sm text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString(
                    "id-ID"
                  )}
                </p>


                <h3 className="mt-2 line-clamp-2 text-xl font-semibold">
                  {item.title}
                </h3>


                {item.excerpt && (
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                    {item.excerpt}
                  </p>
                )}


                <Link
                  href={`/berita/${item.slug}`}
                  className="mt-4 inline-block text-sm font-medium hover:underline"
                >
                  Baca Selengkapnya →
                </Link>

              </div>


            </article>

          ))}

        </div>


      </div>
    </section>
  );
}