import { useState, useEffect } from "react";
import AppLogoIcon from "@/components/app-logo-icon";
import { home } from "@/routes";
import { type SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { type PropsWithChildren } from "react";
import { cn } from "@/lib/utils"; // función de shadcn para combinar clases (opcional)

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
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2">
      <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r overflow-hidden">
        {/* Carrusel de imágenes */}
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

        {/* Capa oscura superpuesta */}
        <div className="absolute inset-0 bg-zinc-900/50" />

        {/* Contenido */}
        <div className="relative z-20 flex flex-col h-full">
          <Link
            href={home()}
            className="flex items-center text-lg font-medium"
          >
            <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
            {name}
          </Link>

          {quote && (
            <div className="mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">“{quote.message}”</p>
                <footer className="text-sm text-neutral-300">
                  {quote.author}
                </footer>
              </blockquote>
            </div>
          )}
        </div>
      </div>

      {/* LADO BLANCO CON FONDO ANIMADO */}
      <div className="relative flex w-full items-center justify-center lg:p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-sky-100 animate-fadeIn" />
        <div className="relative z-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Link
            href={home()}
            className="relative z-20 flex items-center justify-center lg:hidden"
          >
            <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
          </Link>
          <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
            <h1 className="text-3xl md:text-2xl font-bold">{title}</h1>
            <p className="text-sm text-balance text-muted-foreground">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
