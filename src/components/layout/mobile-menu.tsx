"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const menus = [
  { label: "Beranda", id: "home" },
  { label: "Profil", id: "profile" },
  { label: "Guru", id: "guru" },
  { label: "Kegiatan", id: "ekskul" },
  { label: "Berita", id: "news" },
  { label: "Kontak", id: "kontak" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    setOpen(false);

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();

    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Burger Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buka menu"
        className="
          flex h-10 w-10
          items-center justify-center
          rounded-full
          border border-[#E8E1D5]
          bg-[#FFFDF7]
          text-[#241E3D]
          transition-colors
          hover:border-[#FF6B6B]
          hover:text-[#FF6B6B]
          md:hidden
        "
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Portal */}
      {mounted &&
        createPortal(
          <>
            {/* Overlay */}
            {open && (
              <div
                onClick={() => setOpen(false)}
                className="
                  fixed inset-0
                  z-[9998]
                  bg-[#241E3D]/25
                  backdrop-blur-md
                "
              />
            )}

            {/* Sidebar */}
            <aside
              className={`
                fixed
                right-0
                top-0
                z-[9999]
                h-dvh
                w-72
                overflow-hidden
                bg-[#FFFDF7]
                p-6
                shadow-[-12px_0_35px_rgba(36,30,61,0.15)]
                transition-transform
                duration-300
                ease-out
                ${open ? "translate-x-0" : "translate-x-full"}
              `}
            >
              {/* Blob kanan atas */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-48
                  w-48
                  rounded-full
                  bg-[#D9F2FF]
                  opacity-80
                "
              />

              {/* Blob kiri bawah */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-20
                  -left-20
                  h-48
                  w-48
                  rounded-full
                  bg-[#FFF3D0]
                  opacity-80
                "
              />

              {/* Close */}
              <div className="relative flex justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Tutup menu"
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    border border-[#E8E1D5]
                    bg-white
                    text-[#241E3D]
                    transition-colors
                    hover:border-[#FF6B6B]
                    hover:text-[#FF6B6B]
                  "
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="relative mt-8">
                <ul className="flex flex-col gap-2">
                  {menus.map((menu) => (
                    <li key={menu.id}>
                      <a
                        href={
                          pathname === "/"
                            ? `#${menu.id}`
                            : `/#${menu.id}`
                        }
                        onClick={(event) =>
                          handleMenuClick(event, menu.id)
                        }
                        className="
                          block
                          rounded-xl
                          px-4
                          py-3.5
                          text-lg
                          font-semibold
                          text-[#241E3D]
                          transition-colors
                          hover:bg-[#FFF3D0]
                          hover:text-[#FF6B6B]
                        "
                      >
                        {menu.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Decorative dots */}
              <div className="absolute bottom-8 left-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FFCF3F]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#5FCB7A]" />
              </div>
            </aside>
          </>,
          document.body,
        )}
    </>
  );
}