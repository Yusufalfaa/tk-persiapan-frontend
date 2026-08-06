import Link from "next/link";

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

  return (
    <div className="mt-12 flex justify-center gap-2">

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (

        <Link
          key={page}
          href={`/berita?page=${page}`}
          className={`
            flex h-10 w-10 items-center justify-center rounded-md border text-sm

            ${
              page === currentPage
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }
          `}
        >
          {page}
        </Link>

      ))}

    </div>
  );
}