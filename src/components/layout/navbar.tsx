import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6">        
        <nav className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
            <Image
                src="/images/logo.png"
                alt="TK Persiapan"
                width={40}
                height={40}
            />

            <span className="text-lg font-semibold">
                TK Persiapan
            </span>
            </div>

          <ul className="flex items-center gap-8">
            <li><a href="#home">Beranda</a></li>
            <li><a href="#profile">Profil</a></li>
            <li><a href="#teachers">Guru</a></li>
            <li><a href="#news">Berita</a></li>
            <li><a href="#contact">Kontak</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}