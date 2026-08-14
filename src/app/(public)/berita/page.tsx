import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getNews } from "@/services/news.service";
import NewsList from "@/components/news/news-list";
import NewsPagination from "@/components/news/news-pagination";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function NewsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params.page) || 1;

  const response = await getNews(page, 9);

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {/* Page Header */}
      <section
        className="
          relative
          overflow-hidden
          bg-[#EDE6FF]
          pb-[50px]
          pt-[90px]
          md:pb-[60px]
          md:pt-[100px]
        "
      >
        {/* Header Blob */}
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-[#CFC2FF]
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
            h-64
            w-64
            rounded-full
            bg-[#D9F2FF]
            opacity-70
          "
        />

        {/* Decorative Circles */}
        <div
          className="
            pointer-events-none
            absolute
            right-[18%]
            top-20
            h-8
            w-8
            rounded-full
            border-[3px]
            border-[#A78BFA]/40
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[12%]
            bottom-12
            h-5
            w-5
            rounded-full
            bg-[#FFCF3F]/70
          "
        />

        {/* Decorative Dots */}
        <div
          className="
            pointer-events-none
            absolute
            right-[8%]
            top-32
            grid
            grid-cols-3
            gap-3
            opacity-60
          "
        >
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

        <div
          className="
            pointer-events-none
            absolute
            left-[6%]
            top-44
            grid
            grid-cols-3
            gap-3
            opacity-50
          "
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className="
                h-2
                w-2
                rounded-full
                bg-[#FF6B6B]
              "
            />
          ))}
        </div>

        {/* Header Content */}
        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-6
            md:px-8
          "
        >
          {/* Back Link */}
          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-[#62568A]
              transition-colors
              hover:text-[#FF6B6B]
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>

          {/* Header */}
          <div className="mt-8 max-w-2xl">
            <div
              className="
                mb-2
                text-[13px]
                font-extrabold
                uppercase
                tracking-[1.5px]
                text-[#8B72D6]
              "
            >
              Kabar Terkini
            </div>

            <h1
              className="
                text-4xl
                font-semibold
                tracking-[0.2px]
                text-[#241E3D]
                md:text-5xl
              "
            >
              Semua Berita
            </h1>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-[#756B91]
                md:text-[15px]
              "
            >
              Kumpulan kabar dan kegiatan terbaru dari TK Persiapan.
            </p>
          </div>
        </div>
      </section>

      {/* Wave */}
      <svg
        className="
          -mt-[1px]
          block
          h-[35px]
          w-full
          bg-[#EDE6FF]
        "
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0,35 C300,-10 900,80 1200,35 L1200,60 L0,60 Z"
          fill="#FFFDF7"
        />
      </svg>

      {/* News Content */}
      <section
        className="
          relative
          overflow-hidden
          bg-[#FFFDF7]
          py-10
          md:py-14
        "
      >
        {/* Decorative Blob */}
        <div
          className="
            pointer-events-none
            absolute
            -left-20
            top-24
            h-40
            w-40
            rounded-full
            bg-[#DFF6E3]
            opacity-60
            blur-[2px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            bottom-20
            h-44
            w-44
            rounded-full
            bg-[#D9F2FF]
            opacity-60
            blur-[2px]
          "
        />

        {/* Decorative Ring */}
        <div
          className="
            pointer-events-none
            absolute
            right-[5%]
            top-20
            h-16
            w-16
            rounded-full
            border-[5px]
            border-[#FFCF3F]/30
          "
        />

        {/* Decorative Dots */}
        <div
          className="
            pointer-events-none
            absolute
            left-[4%]
            bottom-32
            grid
            grid-cols-3
            gap-3
            opacity-50
          "
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className="
                h-2
                w-2
                rounded-full
                bg-[#FF6B6B]
              "
            />
          ))}
        </div>

        <div
          className="
            pointer-events-none
            absolute
            right-[8%]
            top-1/2
            grid
            grid-cols-3
            gap-3
            opacity-40
          "
        >
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

        {/* Content */}
        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-6
            md:px-8
          "
        >
          <NewsList news={response.data} />

          <NewsPagination
            currentPage={response.meta.page}
            totalPages={response.meta.totalPages}
          />
        </div>
      </section>
    </main>
  );
}