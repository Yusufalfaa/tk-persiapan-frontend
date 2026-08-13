import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E1D5] bg-[#FFFDF7]/95 backdrop-blur-md">
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
                className="font-semibold text-[#241E3D] transition-colors hover:text-[#FF6B6B]"
              >
                Beranda
              </a>
            </li>

            <li>
              <a
                href="#profile"
                className="font-semibold text-[#241E3D] transition-colors hover:text-[#FF6B6B]"
              >
                Profil
              </a>
            </li>

            <li>
              <a
                href="#teachers"
                className="font-semibold text-[#241E3D] transition-colors hover:text-[#FF6B6B]"
              >
                Guru
              </a>
            </li>

            <li>
              <a
                href="#news"
                className="font-semibold text-[#241E3D] transition-colors hover:text-[#FF6B6B]"
              >
                Berita
              </a>
            </li>

            <li>
              <a
                href="#contact"
                className="font-semibold text-[#241E3D] transition-colors hover:text-[#FF6B6B]"
              >
                Kontak
              </a>
            </li>
          </ul>

          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}