import type { NewsDetail } from "@/types/news";
import NewsSectionRenderer from "./news-section-renderer";


interface Props {
  news: NewsDetail;
}


export default function NewsDetail({
  news,
}: Props) {

  return (
    <article className="py-20">

      <div className="mx-auto max-w-4xl px-6">


        <h1 className="text-4xl font-bold">
          {news.title}
        </h1>


        <p className="mt-3 text-sm text-muted-foreground">
          {new Date(
            news.createdAt
          ).toLocaleDateString("id-ID")}
        </p>


        <div className="mt-10 space-y-8">

          {news.sections.map((section) => (

            <NewsSectionRenderer
              key={section.id}
              section={section}
              title={news.title}
            />

          ))}

        </div>


      </div>

    </article>
  );
}