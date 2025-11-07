import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "@inertiajs/react";
import { Menu, X } from "lucide-react";

export default function WelcomeHeader({ canRegister = true }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white shadow-sm sticky top-0 z-50">
      <div
        className="
          flex items-center justify-between
          px-6 sm:px-8 lg:px-8
          py-3
          w-full mx-auto
        "
      >
        {/* Logo */}
        <div className="flex justify-start w-auto">
          <img
            src="/img/logo3.png"
            alt="Tornillos El Capitán"
            className="
              h-14 sm:h-20 md:h-24
              object-contain
              aspect-[6/1]
              transition-all
              duration-300
            "
          />
        </div>

        {/* Menú de escritorio */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="flex justify-end gap-3">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/login"
                  className="btn btn-square bg-sky-600 text-white hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800"
                >
                  INICIA SESIÓN
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {canRegister && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/register"
                    className="btn btn-square bg-white text-sky-600 border-2 border-sky-600 hover:bg-sky-50 focus:ring-4 focus:ring-sky-300 dark:text-sky-500 dark:border-sky-500 dark:focus:ring-sky-800"
                  >
                    REGÍSTRATE
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Botón menú móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-lg text-sky-600 hover:bg-sky-100 transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          menuOpen ? "max-h-40 border-t border-gray-100" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-3 py-3 bg-white">
          <Link
            href="/login"
            className="w-10/12 text-center px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            INICIA SESIÓN
          </Link>

          {canRegister && (
            <Link
              href="/register"
              className="w-10/12 text-center px-4 py-2 rounded-lg border border-sky-600 text-sky-600 hover:bg-sky-50 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              REGÍSTRATE
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
