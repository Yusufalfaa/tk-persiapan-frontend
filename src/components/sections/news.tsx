import Link from "next/link";
import { getNews } from "@/services/news.service";

export default async function News() {
  const news = await getNews();

  return (
    <section
      id="news"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-3xl font-bold">
          Berita Terbaru
        </h2>


        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {news.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border bg-white"
            >

              {/* Thumbnail */}
              <div className="aspect-video overflow-hidden">
                {item.thumbnail ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.thumbnail}`}
                    alt={item.title}
                    className="h-full w-full object-cover"
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


                <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                  {item.excerpt}
                </p>


                <Link
                  href={`/berita/${item.slug}`}
                  className="mt-4 inline-block text-sm font-medium"
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