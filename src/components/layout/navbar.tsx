"use client";

import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
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
      <header
        className="
          fixed
          inset-x-0
          top-0
          z-50
          border-b
          border-[#E8E1D5]
          bg-[#FFFDF7]/95
          backdrop-blur-md
        "
      >
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Logo TK Persiapan Cipinang Besar Selatan"
                width={150}
                height={50}
                priority
                className="h-auto w-auto"
              />
            </Link>

            <ul className="hidden items-center gap-8 md:flex">
              <li>
                <a
                  href="#home"
                  onClick={(event) => scrollToSection(event, "home")}
                  className="font-semibold text-[#241E3D] transition-colors hover:text-[#FF6B6B]"
                >
                  Beranda
                </a>
              </li>

              <li>
                <a
                  href="#profile"
                  onClick={(event) => scrollToSection(event, "profile")}
                  className="font-semibold text-[#241E3D] transition-colors hover:text-[#FF6B6B]"
                >
                  Profil
                </a>
              </li>

              <li>
                <a
                  href="#guru"
                  onClick={(event) => scrollToSection(event, "guru")}
                  className="font-semibold text-[#241E3D] transition-colors hover:text-[#FF6B6B]"
                >
                  Guru
                </a>
              </li>

              <li>
                <a
                  href="#ekskul"
                  onClick={(event) => scrollToSection(event, "ekskul")}
                  className="font-semibold text-[#241E3D] transition-colors hover:text-[#FF6B6B]"
                >
                  Kegiatan
                </a>
              </li>

              <li>
                <a
                  href="#news"
                  onClick={(event) => scrollToSection(event, "news")}
                  className="font-semibold text-[#241E3D] transition-colors hover:text-[#FF6B6B]"
                >
                  Berita
                </a>
              </li>

              <li>
                <a
                  href="#kontak"
                  onClick={(event) => scrollToSection(event, "kontak")}
                  className="font-semibold text-[#241E3D] transition-colors hover:text-[#FF6B6B]"
                >
                  Kontak
                </a>
              </li>
            </ul>

            {/* Hanya tombol burger */}
            <MobileMenu />
          </nav>
        </div>
      </header>
    </>
  );
}