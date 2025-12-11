export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto fixed-bottom w-full">
      <div className="lg:px-40 mx-auto px-4">
        {/* Primera fila */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <a href="/" className="mb-4 md:mb-0">
            <img
              src="/logo5.png"
              alt="Tornillos El Capitán"
              className="w-56 md:w-64 h-auto"
            />
          </a>

          {/* Contacto */}
          <div className="text-center md:text-right text-gray-300">
            <small className="block md:inline">
              <i className="bi bi-envelope mr-1"></i> info@tornilloselcapitan.com
            </small>

            <span className="hidden md:inline mx-2">|</span>

            <small className="block md:inline">
              <i className="bi bi-telephone mr-1"></i> (123) 456-7890
            </small>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="my-6 border-gray-700" />

        {/* Segunda fila */}
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-300">
          <p className="text-center md:text-left mb-3 md:mb-0">
            © {currentYear} Tornillos El Capitán. Todos los derechos reservados.
          </p>

          {/* Links */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-white transition-colors text-sm"
            >
              Políticas de privacidad
            </a>

            <a
              href="#"
              className="hover:text-white transition-colors text-sm"
            >
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
