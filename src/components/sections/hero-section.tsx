import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center"
    >
      {/* Background Image */}
      <Image
        src="/images/hero.png"
        alt="TK Persiapan"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/40" />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          Selamat Datang di
          <br />
          <span>TK Persiapan</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
          Membangun generasi yang cerdas, berkarakter, dan siap menghadapi masa
          depan melalui pendidikan yang berkualitas.
        </p>
      </div>
    </section>
  );
}