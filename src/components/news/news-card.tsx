import Link from "next/link";
import type { NewsList } from "@/types/news";

interface NewsCardProps {
    news: NewsList;
}

function stripHtml(html: string): string {
    if (!html) {
        return "";
    }

    return html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
}

export default function NewsCard({ news }: NewsCardProps) {
    const cleanExcerpt = news.excerpt
        ? stripHtml(news.excerpt)
        : "";

    return (
        <article
            className="
                overflow-hidden
                rounded-2xl
                border
                border-[#6d4fd1]/10
                bg-white
                shadow-[0_12px_26px_rgba(90,70,150,0.1)]
                transition
                hover:-translate-y-1
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
                            bg-[#f3efff]
                            text-sm
                            text-[#6d4fd1]/60
                        "
                    >
                        Tidak ada gambar
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Date */}
                <p className="text-sm text-black">
                    {new Date(news.createdAt).toLocaleDateString("id-ID")}
                </p>

                {/* Title */}
                <h3
                    className="
                        mt-2
                        line-clamp-2
                        text-xl
                        font-bold
                        text-black
                    "
                >
                    {news.title}
                </h3>

                {/* Excerpt */}
                {cleanExcerpt && (
                    <p
                        className="
                            mt-3
                            line-clamp-3
                            text-sm
                            text-[#6f6a7d]
                        "
                    >
                        {cleanExcerpt}
                    </p>
                )}

                {/* Link */}
                <Link
                    href={`/berita/${news.slug}`}
                    className="
                        mt-4
                        inline-block
                        text-sm
                        font-medium
                        text-[#FF6B6B]/80
                        hover:text-black
                        hover:underline
                    "
                >
                    Baca Selengkapnya →
                </Link>
            </div>
        </article>
    );
}