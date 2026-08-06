import Link from "next/link";
import type { News } from "@/types/news";

interface NewsCardProps {
  news: News;
}


export default function NewsCard({
  news,
}: NewsCardProps) {

  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        bg-white
        transition
        hover:shadow-lg
      "
    >

      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">

        {news.thumbnailUrl ? (

          <img
            src={news.thumbnailUrl}
            alt={news.title}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

        ) : (

          <div
            className="
              flex
              h-full
              items-center
              justify-center
              bg-gray-100
              text-sm
              text-gray-500
            "
          >
            Tidak ada gambar
          </div>

        )}

      </div>


      {/* Content */}
      <div className="p-6">

        <p className="text-sm text-muted-foreground">
          {new Date(
            news.createdAt
          ).toLocaleDateString("id-ID")}
        </p>


        <h3
          className="
            mt-2
            line-clamp-2
            text-xl
            font-semibold
          "
        >
          {news.title}
        </h3>


        {news.excerpt && (

          <p
            className="
              mt-3
              line-clamp-3
              text-sm
              text-muted-foreground
            "
          >
            {news.excerpt}
          </p>

        )}


        <Link
          href={`/berita/${news.slug}`}
          className="
            mt-4
            inline-block
            text-sm
            font-medium
            hover:underline
          "
        >
          Baca Selengkapnya →
        </Link>

      </div>

    </article>
  );
}