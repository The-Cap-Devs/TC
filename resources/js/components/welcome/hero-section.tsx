import React from "react";
import { Link } from "@inertiajs/react";

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center min-h-[80vh] text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/img/hero.jpg')" }}
    >
      {/* Franja semitransparente detrás del texto */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-[55%] bg-black/65 z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 px-6 lg:px-16 text-center max-w-5xl animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          SOMOS MAYORISTAS
        </h1>

        <p className="text-base font-medium sm:text-lg mb-8 max-w-3xl mx-auto lg:mx-0">
          Explora nuestra amplia gama de tornillos, tuercas y complementos de
          alta calidad. Desde tornillos en acero inoxidable hasta tuercas en
          bronce, tenemos todo para tus proyectos.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/catalog"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-md text-sm transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <i className="bi bi-grid-3x3-gap mr-1" /> Ver Catálogo
          </Link>

          <Link
            href="/quotes/new"
            className="bg-transparent border border-white hover:bg-white hover:text-black font-semibold px-5 py-2 rounded-md text-sm transition-all duration-200"
          >
            <i className="bi bi-file-earmark-text mr-1" /> Solicitar Cotización
          </Link>
        </div>
      </div>
    </section>
  );
}
