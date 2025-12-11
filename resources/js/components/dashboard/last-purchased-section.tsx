import { Card } from "@/components/ui/card"

export function LastPurchasedSection() {
  const LastPurchasedSection = [
    {
      id: 1,
      name: "Tornillos M8 Acero Inoxidable",
      category: "Tornillos",
      price: "$2,500",
      availability: "150 unidades",
      image: "📦",
    },
    {
      id: 2,
      name: "Kit Extractores de Pines",
      category: "Kits profesionales",
      price: "$35,585",
      availability: "35 unidades",
      image: "🔧",
    },
    {
      id: 3,
      name: "Caja Herramientas 2 Bandejas",
      category: "Herramientas",
      price: "$44,243",
      availability: "40 unidades",
      image: "🛠️",
    },
  ]

  return (
    <section id="productos" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Vistos recientemente</h2>
          <p className="text-lg text-gray-600">Vuelve a ver esos productos que buscaste úlltimamente</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LastPurchasedSection.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow bg-white border border-gray-200"
            >
              <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-6xl">
                {product.image}
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{product.category}</span>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{product.price}</p>
                    <p className="text-sm text-gray-500 mt-1">{product.availability}</p>
                  </div>
                  <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Ver más
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
