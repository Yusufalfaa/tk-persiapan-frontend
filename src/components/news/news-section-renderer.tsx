import { getStorageUrl } from "@/lib/storage-url";
import type { NewsSection } from "@/types/news";

interface Props {
    section: NewsSection;
    title: string;
}

export default function NewsSectionRenderer({
    section,
    title,
}: Props) {
    return (
        <div>
            {/* TEXT */}
            {section.type === "TEXT" && section.text && (
                <div
                    className="
                        leading-relaxed
                        text-muted-foreground

                        [&_p]:mb-4
                        [&_p:last-child]:mb-0

                        [&_strong]:font-semibold
                        [&_b]:font-bold

                        [&_em]:italic
                        [&_i]:italic

                        [&_u]:underline

                        [&_ul]:my-4
                        [&_ul]:ml-6
                        [&_ul]:list-disc

                        [&_ol]:my-4
                        [&_ol]:ml-6
                        [&_ol]:list-decimal

                        [&_li]:mb-1

                        [&_a]:text-blue-600
                        [&_a]:underline
                    "
                    dangerouslySetInnerHTML={{
                        __html: section.text,
                    }}
                />
            )}

            {/* IMAGE */}
            {section.type === "IMAGE" && section.imageUrl && (
                <div className="relative aspect-video overflow-hidden rounded-xl">
                    <img
                        src={getStorageUrl(section.imageUrl) ?? ""}
                        alt={title}
                        className="
                            h-full
                            w-full
                            object-cover
                        "
                    />
                </div>
            )}

            {/* YOUTUBE */}
            {section.type === "YOUTUBE" &&
                section.youtubeUrl && (
                    <div className="aspect-video">
                        <iframe
                            src={convertYoutubeUrl(
                                section.youtubeUrl
                            )}
                            title={title}
                            className="
                                h-full
                                w-full
                                rounded-xl
                            "
                            allow="
                                accelerometer;
                                autoplay;
                                clipboard-write;
                                encrypted-media;
                                gyroscope;
                                picture-in-picture;
                                web-share
                            "
                            allowFullScreen
                        />
                    </div>
                )}
        </div>
    );
}

function convertYoutubeUrl(url: string): string {
    try {
        const parsedUrl = new URL(url);
        const videoId = parsedUrl.searchParams.get("v");

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }

        if (parsedUrl.hostname === "youtu.be") {
            const id = parsedUrl.pathname.slice(1);

            if (id) {
                return `https://www.youtube.com/embed/${id}`;
            }
        }

        if (parsedUrl.pathname.startsWith("/embed/")) {
            return url;
        }

        return "";
    } catch {
        return "";
    }
}

