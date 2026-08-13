import Image from "next/image";

export default function HeroSection() {
    return (
        <section
            id="home"
            className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-[#D9F2FF]
                to-[#DFF6E3]
                pb-10
            "
        >
            {/* Decorative dots */}
            <div className="absolute inset-0 pointer-events-none">
                <span
                    className="
                        absolute
                        left-[6%]
                        top-[60px]
                        h-[14px]
                        w-[14px]
                        rounded-full
                        bg-[#FFCF3F]
                    "
                />

                <span
                    className="
                        absolute
                        left-[16%]
                        top-[140px]
                        h-[10px]
                        w-[10px]
                        rounded-full
                        bg-[#FF6B6B]
                    "
                />

                <span
                    className="
                        absolute
                        right-[8%]
                        top-[90px]
                        h-[18px]
                        w-[18px]
                        rounded-full
                        bg-[#A78BFA]
                    "
                />

                <span
                    className="
                        absolute
                        bottom-[40px]
                        left-[38%]
                        h-[12px]
                        w-[12px]
                        rounded-full
                        bg-[#5FCB7A]
                    "
                />

                <span
                    className="
                        absolute
                        right-[22%]
                        top-[200px]
                        h-[9px]
                        w-[9px]
                        rounded-full
                        bg-[#5EC8F2]
                    "
                />
            </div>

            {/* Content */}
            <div
                className="
                    relative
                    z-10
                    mx-auto
                    grid
                    max-w-[1100px]
                    grid-cols-1
                    items-center
                    gap-10
                    px-8
                    pb-[30px]
                    pt-16
                    lg:grid-cols-[1.05fr_.95fr]
                "
            >
                {/* Text */}
                <div>
                    <h1
                        className="
                            text-4xl
                            font-bold
                            leading-tight
                            tracking-[0.2px]
                            text-[#241E3D]
                            md:text-[48px]
                        "
                    >
                        Selamat Datang di
                        <br />
                        <span className="text-[#FF6B6B]">
                            TK Persiapan
                        </span>
                    </h1>

                    <p
                        className="
                            mt-4
                            mb-[26px]
                            max-w-[420px]
                            text-sm
                            leading-relaxed
                            text-[#4A4560]
                            md:text-[14.5px]
                        "
                    >
                        Tempat anak-anak belajar, bermain, dan tumbuh
                        dengan gembira bersama guru-guru terbaik kami.
                    </p>
                </div>

                {/* Photo */}
                <div
                    className="
                        relative
                        mx-auto
                        w-full
                        max-w-[500px]
                        lg:max-w-none
                    "
                >
                    <div
                        className="
                            relative
                            h-[280px]
                            overflow-hidden
                            rounded-[24px]
                            border-[6px]
                            border-white
                            shadow-[0_20px_40px_rgba(50,40,90,0.18)]
                            rotate-2
                            md:h-[320px]
                        "
                    >
                        <Image
                            src="/images/hero.png"
                            alt="TK Persiapan"
                            fill
                            priority
                            sizes="(max-width: 1024px) 90vw, 500px"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <svg
                className="
                    relative
                    z-10
                    -mb-[2px]
                    block
                    h-[70px]
                    w-full
                "
                viewBox="0 0 1200 70"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,40 C300,90 900,-10 1200,40 L1200,70 L0,70 Z"
                    fill="#FFFDF7"
                />
            </svg>
        </section>
    );
}