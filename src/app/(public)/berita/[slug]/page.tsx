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
      <div className="py-20 text-center">
        Berita tidak ditemukan
      </div>
    );
  }


  return (
    <NewsDetail
      news={news}
    />
  );
}