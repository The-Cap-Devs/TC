import React from "react";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  iconClass: string;
}

const AnimatedLink = ({ href, children, iconClass }: AnimatedLinkProps) => {
  return (
    <a
      href={href}
      className="group relative flex items-center gap-2 text-white transition-colors duration-300 hover:text-sky-200 w-fit"
    >
      <i className={`${iconClass} text-xl`}></i>

      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-sky-200 transition-all duration-300 ease-out group-hover:w-full"></span>
      </span>
    </a>
  );
};

export default function CTASection() {
  return (
    <section className="relative bg-sky-700 overflow-hidden py-0 mt-10 min-h-[500px]">
      
      <div className="absolute inset-0 opacity-5 pointer-events-none">
         <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="1" fill="none"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
         </svg>
      </div>

      {/* Contenedor Principal */}
      <div className="w-full h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          
          {/* Columna de texto */}
          <div className="flex items-center px-6 md:px-14 py-12 lg:py-0">
            <div className="max-w-xl mx-auto">
              <h2 className="text-white font-bold leading-tight mb-3 text-4xl md:text-5xl drop-shadow-md">
                ¿Necesitas ayuda?
              </h2>

              <h4 className="text-sky-100 font-medium text-lg md:text-xl mb-4">
                No dudes en contactarnos
              </h4>

              <p className="text-sky-50 text-sm md:text-base leading-relaxed">
                Nuestro equipo experimentado está listo para ayudarte con
                cualquier pregunta sobre nuestros productos o servicios.
                Calidad y atención al cliente son nuestra prioridad.
              </p>

              <div className="mt-8 space-y-4 font-bold">                
                <div>
                  <AnimatedLink href="tel:1-800-FASTENERS" iconClass="bi bi-telephone">
                    (800) FASTENERS
                  </AnimatedLink>
                </div>

                <div>
                  <AnimatedLink href="mailto:info@tornilloselcapitan.com" iconClass="bi bi-envelope">
                    info@tornilloselcapitan.com
                  </AnimatedLink>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen Lateral */}
          <div className="w-full h-[300px] lg:h-auto lg:min-h-[600px] relative">
            <div className="absolute inset-0 bg-sky-900/20 mix-blend-multiply z-10"></div>            
            <img
              src="/img/CTA.jpg"
              alt="Atención al cliente"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = "/img/cta-placeholder.jpg";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}