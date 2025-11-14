import { Link } from "@inertiajs/react";
import { Search, FilePlus2, CheckCircle2 } from "lucide-react";

export default function HowToQuoteSection() {
    return (
        <section className="how-it-works py-20">
            <div className="w-full max-w-7xl mx-auto px-6">
                
                {/* Títulos */}
                <div className="mb-16 text-right">
                    <h2 className="font-bold text-4xl md:text-5xl inline-block relative">
                        ¿Sabes cómo realizar tu cotización?
                    </h2>
                    <p className="text-base md:text-lg mt-2 text-gray-600 dark:text-gray-300">
                        Automatiza tu proceso de compra de tornillería en solo unos minutos.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">

                    {/* Step 1 */}
                    <div className="w-full">
                        <div className="step-card bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                            <div className="text-center">
                                <div className="step-icon-wrapper mx-auto mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-blue-600 text-4xl transition-all duration-300">
                                    <Search size={45} />
                                </div>

                                <h3 className="text-xl font-bold mb-3">1. Explora y Encuentra</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Navega por nuestro extenso catálogo de tornillos, tuercas y accesorios. 
                                    Utiliza los filtros para encontrar el producto exacto que necesitas.
                                </p>

                                <Link 
                                    href="/catalog"
                                    className="inline-block mt-5 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                                >
                                    Explorar catálogo
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="w-full">
                        <div className="step-card bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                            <div className="text-center">
                                <div className="step-icon-wrapper mx-auto mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-blue-600 text-4xl transition-all duration-300">
                                    <FilePlus2 size={45} />
                                </div>

                                <h3 className="text-xl font-bold mb-3">2. Prepara tu Solicitud</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Añade los productos y las cantidades deseadas a tu lista de cotización. 
                                    Revisa los detalles y haz ajustes si es necesario.
                                </p>

                                <Link 
                                    href="/cart"
                                    className="inline-block mt-5 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                                >
                                    Revisar carrito
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="w-full">
                        <div className="step-card bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                            <div className="text-center">
                                <div className="step-icon-wrapper mx-auto mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-blue-600 text-4xl transition-all duration-300">
                                    <CheckCircle2 size={45} />
                                </div>

                                <h3 className="text-xl font-bold mb-3">3. Envía y Recibe</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Envía tu solicitud. Nuestro equipo la revisará y recibirás tu cotización 
                                    final con precios y disponibilidad en tiempo récord.
                                </p>

                                <Link 
                                    href="/quotes/new"
                                    className="inline-block mt-5 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                                >
                                    Enviar Cotización
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
