import { useState, useEffect } from "react";
import AppLogoIcon from "@/components/app-logo-icon";
import { home } from "@/routes";
import { type SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { type PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  title?: string;
  description?: string;
}

const backgroundImages = [
  "/img/login/login1.jpg",
  "/img/login/login2.jpg",
  "/img/login/login3.jpg",
];

export default function AuthSplitLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  const { name, quote } = usePage<SharedData>().props;
  const [currentImage, setCurrentImage] = useState(0);

  // Cambiar automáticamente cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2">
      {/* Lado izquierdo (carrusel) */}
      <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r overflow-hidden">
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out",
                index === currentImage ? "opacity-100" : "opacity-0"
              )}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-zinc-900/50" />

        <div className="relative z-20 flex flex-col h-full">
          <Link
            href={home()}
            className="flex items-start justify-start mb-10 max-w-20">
            <img src="./img/logos/logo-tornillo.png" alt="Tornillos el Capitán" />
          </Link>
        </div>
      </div>

      {/* Lado derecho (contenido y formulario) */}
      <div className="relative flex w-full items-center justify-center px-6 py-10 sm:px-8 lg:p-8 overflow-hidden">
        {/* Fondo suave opcional */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-sky-100 animate-fadeIn" /> */}

        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col justify-center space-y-6">
          {/* Logo móvil */}
          <Link
            href={home()}
            className="flex w-full items-center justify-center lg:hidden">
            <img
              src="./img/logos/logo-tornillo.png"
              alt="Tornillos el Capitán"
              className="w-20 h-auto"
            />
          </Link>

          {/* Título y descripción */}
          <div className="flex flex-col gap-4 items-center text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground text-balance">
              {description}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
