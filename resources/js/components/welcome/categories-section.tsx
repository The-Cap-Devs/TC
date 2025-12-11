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

const GeometricPattern = ({ variant = 0 }) => {
  const isEven = variant % 2 === 0;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Figura Principal */}
      <svg
        className={`absolute w-64 h-64 text-gray-100 dark:text-neutral-800 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2
          ${isEven ? "-right-10 -bottom-10 rotate-12" : "-left-10 -top-10 -rotate-12"}
        `}
        viewBox="0 0 200 200"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M45.7,-76.3C58.9,-69.3,69.1,-55.5,76.1,-41.2C83.1,-26.9,86.9,-12.1,84.6,1.8C82.3,15.7,73.9,28.7,64.2,39.7C54.5,50.7,43.5,59.7,31.4,66.3C19.3,72.9,6.1,77.1,-6.1,75.9C-18.3,74.7,-29.5,68.1,-40.4,60.8C-51.3,53.5,-61.9,45.5,-70.5,35.2C-79.1,24.9,-85.7,12.3,-83.4,0.7C-81.1,-10.9,-69.9,-21.5,-59.4,-30.9C-48.9,-40.3,-39.1,-48.5,-28.3,-56.9C-17.5,-65.3,-5.7,-73.9,7.4,-75.2C20.5,-76.5,41,-70.5,45.7,-76.3Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Figura Secundaria */}
      <svg
        className={`absolute w-32 h-32 text-gray-200 dark:text-neutral-700 opacity-60 transition-all duration-500 group-hover:translate-x-2
           ${isEven ? "left-4 top-4" : "right-4 bottom-4"}
        `}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
      </svg>
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-black/20 dark:to-transparent opacity-50" />
    </div>
  );
};

export default function CategoriesSection() {
  return (
    <section className="py-14 mb-10 bg-white dark:bg-black/20"> 
      {/* Encabezado */}
      <div className="container mx-auto px-4">
        <div className="text-center md:text-end mb-12">
          <h2 className="relative inline-block text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 after:content-[''] after:block after:w-full after:h-1.5 after:bg-sky-600 after:absolute after:-bottom-2 after:left-0">
            NUESTROS PRODUCTOS
          </h2>
          <p className="mt-6 text-gray-600 dark:text-gray-400 text-base md:text-lg font-light tracking-wide">
            Ingeniería y resistencia en cada pieza. Explora nuestras categorías.
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <GeometricPattern variant={index} />

              <div className="relative z-10 w-full aspect-[16/3] flex items-center justify-center p-4">
                 <div className="absolute w-24 h-24 bg-sky-50 dark:bg-sky-900/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110 relative z-10"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "/img/products/placeholder.png";
                  }}
                />
              </div>

              {/* Texto */}
              <div className="relative z-10 p-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-t border-gray-100 dark:border-neutral-800">
                <h5 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-sky-600 transition-colors leading-tight">
                  {category.name}
                </h5>
                <div className="w-0 group-hover:w-full h-0.5 bg-sky-600 mt-2 transition-all duration-300 ease-in-out"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}