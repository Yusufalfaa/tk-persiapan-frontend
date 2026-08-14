export default function Footer() {
  return (
    <>
      {/* Footer Wave */}
      <svg
        className="block h-[50px] w-full"
        viewBox="0 0 1200 70"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C300,-10 900,90 1200,40 L1200,70 L0,70 Z"
          fill="#241E3D"
        />
      </svg>

      {/* Footer */}
      <footer
        className="
          relative
          overflow-hidden
          bg-[#241E3D]
          px-6
          pb-7
          pt-11
          text-center
          text-white
        "
      >
        {/* Decorative Dots */}
        <span
          className="
            absolute
            left-[12%]
            top-5
            h-2
            w-2
            rounded-full
            bg-[#FFCF3F]
          "
        />

        <span
          className="
            absolute
            bottom-[30px]
            right-[14%]
            h-3
            w-3
            rounded-full
            bg-[#FF6B6B]
          "
        />

        <span
          className="
            absolute
            right-[30%]
            top-[50px]
            h-1.5
            w-1.5
            rounded-full
            bg-[#5FCB7A]
          "
        />

        <div className="mx-auto max-w-7xl px-6">
          <p className="text-[11.5px] text-white/55">
            © 2026 TK Persiapan. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}