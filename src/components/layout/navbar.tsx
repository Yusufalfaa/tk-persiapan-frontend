import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
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
            <li><a href="#home">Beranda</a></li>
            <li><a href="#profile">Profil</a></li>
            <li><a href="#teachers">Guru</a></li>
            <li><a href="#news">Berita</a></li>
            <li><a href="#contact">Kontak</a></li>
          </ul>

          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}