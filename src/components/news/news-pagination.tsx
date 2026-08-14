import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function NewsPagination({
  currentPage,
  totalPages,
}: NewsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      );
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis-end",
      totalPages,
    ];
  };

  return (
    <nav
      aria-label="Navigasi halaman"
      className="
        mt-12
        flex
        flex-wrap
        items-center
        justify-center
        gap-2
        pb-10
      "
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={`/berita?page=${currentPage - 1}`}
          aria-label="Halaman sebelumnya"
          className="
            flex
            h-[38px]
            min-w-[38px]
            items-center
            justify-center
            rounded-[12px]
            border-[1.8px]
            border-[#EAE5DA]
            bg-white
            text-[#241E3D]
            transition-all
            duration-150
            hover:border-[#FF6B6B]
            hover:text-[#FF6B6B]
          "
        >
          <ChevronLeft className="h-[15px] w-[15px] stroke-[2.4]" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="
            flex
            h-[38px]
            min-w-[38px]
            cursor-not-allowed
            items-center
            justify-center
            rounded-[12px]
            border-[1.8px]
            border-[#EAE5DA]
            bg-white
            text-[#241E3D]
            opacity-35
          "
        >
          <ChevronLeft className="h-[15px] w-[15px] stroke-[2.4]" />
        </span>
      )}

      {/* Pages */}
      {getPages().map((page, index) => {
        if (typeof page === "string") {
          return (
            <span
              key={`${page}-${index}`}
              className="
                px-1
                text-[13px]
                font-extrabold
                text-[#7C7A74]
              "
            >
              …
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={`/berita?page=${page}`}
            aria-current={isActive ? "page" : undefined}
            className={`
              flex
              h-[38px]
              min-w-[38px]
              items-center
              justify-center
              rounded-[12px]
              border-[1.8px]
              px-2
              text-[13px]
              font-extrabold
              no-underline
              transition-all
              duration-150

              ${
                isActive
                  ? "border-[#FF6B6B] bg-[#FF6B6B] text-white shadow-[0_6px_14px_rgba(255,107,107,0.35)]"
                  : "border-[#EAE5DA] bg-white text-[#241E3D] hover:border-[#FF6B6B] hover:text-[#FF6B6B]"
              }
            `}
          >
            {page}
          </Link>
        );
      })}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={`/berita?page=${currentPage + 1}`}
          aria-label="Halaman berikutnya"
          className="
            flex
            h-[38px]
            min-w-[38px]
            items-center
            justify-center
            rounded-[12px]
            border-[1.8px]
            border-[#EAE5DA]
            bg-white
            text-[#241E3D]
            transition-all
            duration-150
            hover:border-[#FF6B6B]
            hover:text-[#FF6B6B]
          "
        >
          <ChevronRight className="h-[15px] w-[15px] stroke-[2.4]" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="
            flex
            h-[38px]
            min-w-[38px]
            cursor-not-allowed
            items-center
            justify-center
            rounded-[12px]
            border-[1.8px]
            border-[#EAE5DA]
            bg-white
            text-[#241E3D]
            opacity-35
          "
        >
          <ChevronRight className="h-[15px] w-[15px] stroke-[2.4]" />
        </span>
      )}
    </nav>
  );
}