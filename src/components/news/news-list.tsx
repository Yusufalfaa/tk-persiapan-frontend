
import NewsCard from "./news-card";
import type { News } from "@/types/news";


interface NewsListProps {
  news: News[];
}


export default function NewsList({
  news,
}: NewsListProps) {

  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-3
      "
    >
      {news.map((item) => (
        <NewsCard
          key={item.id}
          news={item}
        />
      ))}
    </div>
  );
}