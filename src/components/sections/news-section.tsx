import Link from "next/link";
import { getNews } from "@/services/news.service";
import NewsList from "@/components/news/news-list";

export default async function NewsSection() {
  const response = await getNews(1, 3);

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
          fill="#EDE6FF"
        />
      </svg>

      {/* News */}
      <section
        id="news"
        className="
          scroll-mt-[90px]
          relative
          overflow-hidden
          bg-[#EDE6FF]
          py-[70px]
          pb-[76px]
        "
      >
        {/* Decorative Circle */}
        <div
          className="
            absolute
            bottom-[-20px]
            right-[-30px]
            z-0
            h-[260px]
            w-[260px]
            rounded-full
            bg-[#A78BFA]
            opacity-50
            blur-[2px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1100px] px-8">
          {/* News Header */}
          <div
            className="
              mb-7
              flex
              items-end
              justify-between
            "
          >
            <div>
              {/* Kicker */}
              <div
                className="
                  mb-2
                  text-[16px]
                  font-extrabold
                  uppercase
                  tracking-[1.5px]
                  text-[#6D4FD1]
                "
              >
                Kabar Terkini
              </div>

              {/* Title */}
              <h2
                className="
                  text-[32px]
                  font-semibold
                  tracking-[0.2px]
                  text-[#241E3D]
                "
              >
                Berita Terbaru
              </h2>
            </div>

            {/* View All */}
            <Link
              href="/berita"
              className="
                inline-flex
                items-center
                rounded-lg
                border
                border-[#EAE5DA]
                bg-white
                px-4
                py-2
                text-[12px]
                font-bold
                text-[#2B2B2B]
                transition-colors
                hover:border-[#FF6B6B]
                hover:text-[#FF6B6B]
              "
            >
              Lihat Semua Berita →
            </Link>
          </div>

          {/* News List */}
          <div>
            <NewsList news={response.data} />
          </div>
        </div>
      </section>
    </>
  );
}