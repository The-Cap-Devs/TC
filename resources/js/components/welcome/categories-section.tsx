import React from "react";

const categories = [
  { name: "Tornillos de cabeza hexagonal", image: "/img/products/3000_FT.png" },
  { name: "Tuercas y pernos", image: "/img/products/3300.png" },
  { name: "Arandelas", image: "/img/products/3400.png" },
  { name: "Tornillos autorroscantes", image: "/img/products/3180.png" },
  { name: "Pernos estructurales", image: "/img/products/3000_FT.png" },
  { name: "Arandelas de presión", image: "/img/products/3300.png" },
  { name: "Tornillos allen", image: "/img/products/3400.png" },
  { name: "Anclajes metálicos", image: "/img/products/3180.png" },
];

export default function CategoriesSection() {
  return (
    <section className="py-10 mb-10">
      {/* --- Encabezado --- */}
      <div className="text-center md:text-end mb-12">
        <h2 className="relative inline-block text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 after:content-[''] after:block after:w-90 after:h-1 after:bg-sky-600 after:mx-auto after:mt-2">
          NUESTROS PRODUCTOS
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-base md:text-lg">
          Explora entre nuestras variadas categorías y pide tu cotización
        </p>
      </div>

      {/* --- Grid de categorías --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            {/* Imagen */}
            <div className="relative overflow-hidden aspect-[3/1] rounded-t-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Nombre */}
            <div className="p-3 text-center">
              <h5 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mt-1">
                {category.name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
