"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobile-menu";

const menus = [
  { label: "Beranda", id: "home" },
  { label: "Profil", id: "profile" },
  { label: "Guru", id: "guru" },
  { label: "Kegiatan", id: "ekskul" },
  { label: "Berita", id: "news" },
  { label: "Kontak", id: "kontak" },
];

export default function Navbar() {
  const pathname = usePathname();

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
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
            {menus.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={pathname === "/" ? `#${menu.id}` : "/"}
                  onClick={(event) => scrollToSection(event, menu.id)}
                  className="
                    font-semibold
                    text-[#241E3D]
                    transition-colors
                    hover:text-[#FF6B6B]
                  "
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>

          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}