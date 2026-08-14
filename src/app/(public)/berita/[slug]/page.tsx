import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getNewsDetail } from "@/services/news.service";
import NewsDetail from "@/components/news/news-detail";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const news = await getNewsDetail(slug);

  if (!news) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#FFFDF7]
          px-6
        "
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#241E3D]">
            Berita tidak ditemukan
          </h1>

          <Link
            href="/berita"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-[12px]
              bg-[#FF6B6B]
              px-5
              py-3
              text-sm
              font-bold
              text-white
              transition-all
              hover:bg-[#E85555]
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Berita
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#FFFDF7]
        py-24
        md:py-28
      "
    >
      {/* Decorative dots */}
      <div className="pointer-events-none absolute left-[8%] top-32 grid grid-cols-3 gap-3 opacity-60">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="
              h-2
              w-2
              rounded-full
              bg-[#FFCF3F]
            "
          />
        ))}
      </div>

      <div className="pointer-events-none absolute right-[8%] top-48 grid grid-cols-3 gap-3 opacity-50">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="
              h-2
              w-2
              rounded-full
              bg-[#A78BFA]
            "
          />
        ))}
      </div>

      {/* Blob */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-[#EDE6FF]
          opacity-70
          blur-[2px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-24
          h-72
          w-72
          rounded-full
          bg-[#DFF6E3]
          opacity-70
          blur-[2px]
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-5xl
          px-6
          md:px-8
        "
      >
        {/* Back Button */}
        <Link
          href="/berita"
          className="
            mb-8
            inline-flex
            items-center
            gap-2
            rounded-[12px]
            border-[1.8px]
            border-[#EAE5DA]
            bg-white
            px-4
            py-2.5
            text-sm
            font-bold
            text-[#241E3D]
            shadow-sm
            transition-all
            hover:border-[#FF6B6B]
            hover:text-[#FF6B6B]
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Berita
        </Link>

        {/* Article */}
        <article
          className="
            rounded-[24px]
            border
            border-[#EAE5DA]
            bg-white
            p-6
            shadow-[0_12px_35px_rgba(36,30,61,0.06)]
            md:p-10
          "
        >
          <NewsDetail news={news} />
        </article>
      </div>
    </main>
  );
}