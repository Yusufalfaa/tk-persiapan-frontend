"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const menus = [
  { label: "Beranda", href: "#home" },
  { label: "Profil", href: "#profile" },
  { label: "Guru", href: "#teachers" },
  { label: "Berita", href: "#news" },
  { label: "Kontak", href: "#contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button Burger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed right-0 top-0 z-50
          h-full w-72
          bg-white
          p-6
          shadow-lg
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-end">
          <button onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          <ul className="flex flex-col gap-6">
            {menus.map((menu) => (
              <li key={menu.href}>
                <a
                  href={menu.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium"
                >
                  {menu.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}