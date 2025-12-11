import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useState } from "react"
import { Trash2, ShoppingCart } from "lucide-react"
import { Link } from "@inertiajs/react"

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/dashboard' },
    { title: 'Carrito', href: '/cart' },
];


interface CartItem {
  id: number
  sku: string
  name: string
  description: string
  specifications: string
  quantity: number
}

// Mock cart data - in production this would come from state management or backend
const mockCartItems: CartItem[] = [
  {
    id: 1,
    sku: "TM-8-50",
    name: "Tornillo Métrico M8 x 50mm",
    description: "Acero galvanizado, acabado brillante",
    specifications: "Métrica M8, Largo 50mm, Paso 1.25mm, Acero DIN 933",
    quantity: 100,
  },
  {
    id: 2,
    sku: "TH-M8",
    name: "Tuerca Hexagonal M8",
    description: "Aleación de acero resistente",
    specifications: "Métrica M8, Altura 6.5mm, Acero DIN 934",
    quantity: 150,
  },
  {
    id: 12,
    sku: "TUA-M10",
    name: "Tuerca Autoblocante M10",
    description: "Nylon autoblocante antisoltado",
    specifications: "Métrica M10, Nylon DIN 985, Autoblocante",
    quantity: 75,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)
  const [updatedQuantities, setUpdatedQuantities] = useState<Record<number, number>>({})

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setUpdatedQuantities((prev) => ({
        ...prev,
        [itemId]: newQuantity,
      }))
    }
  }

  const handleRemoveItem = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const handleUpdateQuantity = (itemId: number) => {
    const quantity = updatedQuantities[itemId]
    if (quantity !== undefined) {
      setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
      setUpdatedQuantities((prev) => {
        const newState = { ...prev }
        delete newState[itemId]
        return newState
      })
    }
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>

    <div className="min-h-screen mt-10 bg-white flex flex-col">

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Carrito de Compras</h1>
          <p className="text-gray-600">
            {cartItems.length} producto{cartItems.length !== 1 ? "s" : ""} - {totalItems} unidade
            {totalItems !== 1 ? "s" : ""}
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart Table */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Producto</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Especificaciones</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cantidad</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-gray-900">{item.sku}</p>
                              <p className="text-sm text-gray-600 mt-1">{item.name}</p>
                              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-600">{item.specifications}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="1"
                                value={
                                  updatedQuantities[item.id] !== undefined ? updatedQuantities[item.id] : item.quantity
                                }
                                onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 0)}
                                className="w-20 px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1975cc]"
                              />
                              {updatedQuantities[item.id] !== undefined && (
                                <button
                                  onClick={() => handleUpdateQuantity(item.id)}
                                  className="px-3 py-1.5 text-xs font-medium bg-[#1975cc] text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                  Actualizar
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                              aria-label="Eliminar item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link
                  href="/products"
                  className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
                >
                  Seguir Comprando
                </Link>
                <Link
                  href="/quotations" 
                className="px-6 py-3 bg-[#1975cc] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                type="button"
                
                >
                  Convertir a Cotización
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen del Pedido</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total de Items:</span>
                    <span className="font-semibold text-gray-900">{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Productos Únicos:</span>
                    <span className="font-semibold text-gray-900">{cartItems.length}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-[#1975cc] rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Nota:</span> Los precios serán confirmados en la cotización según
                    volumen y condiciones comerciales.
                  </p>
                </div>

                <button className="w-full px-6 py-3 bg-[#1975cc] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
                  Solicitar Cotización
                </button>

                <button className="w-full px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Guardar para Después
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
              <p className="text-gray-600 mb-6">Explora nuestro catálogo y agrega productos a tu pedido.</p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-[#1975cc] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        )}
      </main>


    </div>

    </AppLayout>
  )
}
