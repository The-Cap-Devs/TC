import { Link } from "@inertiajs/react";
import { Search, FilePlus2, CheckCircle2, UserRoundPen } from "lucide-react";

export default function HowToQuoteSection() {
    return (
        <section className="how-it-works py-20">
            <div className="w-full ">
                
                {/* Títulos */}
                <div className="mb-16 text-center md:text-left">
                    <h2 className="relative inline-block text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 after:content-[''] after:block after:w-90 after:h-1 after:bg-sky-600 after:mx-auto after:mt-2">
                        ¿Sabes cómo realizar tu cotización?
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 text-base md:text-lg">
                        Automatiza tu proceso de compra de tornillería en solo unos minutos.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">

                    {/* Step 1 */}
                    <div className="w-full">
                        <div className="step-card bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                            <div className="text-center">
                                <div className="step-icon-wrapper mx-auto mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-sky-600 text-4xl transition-all duration-300">
                                    <UserRoundPen size={45} />
                                </div>

                                <h3 className="text-xl font-bold mb-3">1. Regístrate como cliente</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Ve a la pestaña de registro y crea tu cuenta de cliente para acceder a 
                                    nuestro catálogo completo de productos.
                                </p>

                                <Link 
                                    href="/register"
                                    className="inline-block mt-5 px-5 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
                                >
                                    Regístrate Ahora
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="w-full">
                        <div className="step-card bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                            <div className="text-center">
                                <div className="step-icon-wrapper mx-auto mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-sky-600 text-4xl transition-all duration-300">
                                    <FilePlus2 size={45} />
                                </div>

                                <h3 className="text-xl font-bold mb-3">2. Explora nuestro catálogo</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Navega por nuestras categorías de productos y añade los artículos que 
                                    necesitas a tu carrito de cotización.
                                </p>

                                <Link 
                                    href="/cart"
                                    className="inline-block mt-5 px-5 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
                                >
                                    Explorar Catálogo
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="w-full">
                        <div className="step-card bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                            <div className="text-center">
                                <div className="step-icon-wrapper mx-auto mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-sky-600 text-4xl transition-all duration-300">
                                    <CheckCircle2 size={45} />
                                </div>

                                <h3 className="text-xl font-bold mb-3">3. Envía y Recibe</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Envía tu solicitud. Nuestro equipo la revisará y recibirás tu cotización 
                                    final con precios y disponibilidad en tiempo récord.
                                </p>

                                <Link 
                                    href="/quotes/new"
                                    className="inline-block mt-5 px-5 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
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
