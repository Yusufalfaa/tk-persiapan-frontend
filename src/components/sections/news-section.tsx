import Link from "next/link";
import { getNews } from "@/services/news.service";
import NewsList from "@/components/news/news-list";


export default async function NewsSection() {

  const response = await getNews(1,3);

  return (
    <section
      id="news"
      className="py-20"
    >

      <div className="mx-auto max-w-7xl px-6">

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
              hover:bg-gray-100
            "
          >
            Lihat Semua Berita
          </Link>

        </div>


        <div className="mt-10">
          <NewsList
            news={response.data}
          />
        </div>


      </div>

    </section>
  );
}