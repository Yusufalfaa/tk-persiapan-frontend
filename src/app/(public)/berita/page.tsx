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

  const page =
    Number(params.page) || 1;


  const response = await getNews(
    page,
    9
  );


  return (
    <main className="py-20">

      <div className="mx-auto max-w-7xl px-6">


        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Berita
          </h1>


          <p className="mt-2 text-muted-foreground">
            Informasi terbaru dari TK Persiapan
          </p>

        </div>


        <NewsList
          news={response.data}
        />


        <NewsPagination
          currentPage={response.meta.page}
          totalPages={response.meta.totalPages}
        />


      </div>

    </main>
  );
}