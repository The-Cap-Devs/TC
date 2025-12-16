import { useState } from "react"
import AppLayout from '@/layouts/app-layout';
import { ChevronRight, Eye, Edit2, Trash2, Plus } from "lucide-react"
import { BreadcrumbItem } from '@/types';

// Definimos los breadcrumbs aquí mismo para evitar errores de importación circular
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/dashboard' },
    { title: 'Carrito', href: '/cart' },
    { title: 'Cotizaciones', href: '/quotes' },
];

interface QuotationItem {
  id: string
  name: string
  quantity: number
  description: string
}

interface Quotation {
  id: string
  number: string
  date: string
  status: "aprobado" | "en_revision" | "enviado" | "negado"
  items: QuotationItem[]
  total: number
}

const mockQuotations: Quotation[] = [
  {
    id: "1",
    number: "COT-2024-001",
    date: "2024-12-01",
    status: "aprobado",
    items: [
      { id: "1", name: "Tornillo M8x50 Acero", quantity: 100, description: "Grado 8.8" },
      { id: "2", name: "Tuerca Hexagonal M8", quantity: 100, description: "DIN 985" },
    ],
    total: 1250.0,
  },
  {
    id: "2",
    number: "COT-2024-002",
    date: "2024-11-28",
    status: "en_revision",
    items: [{ id: "3", name: "Perno Cabeza Redonda M10x60", quantity: 50, description: "Acero Galvanizado" }],
    total: 780.0,
  },
  {
    id: "3",
    number: "COT-2024-003",
    date: "2024-11-25",
    status: "enviado",
    items: [
      { id: "4", name: "Arandela Metálica M8", quantity: 200, description: "Acero Inoxidable" },
      { id: "5", name: "Remache Aluminio 3/16", quantity: 150, description: "Pop" },
    ],
    total: 2100.0,
  },
  {
    id: "4",
    number: "COT-2024-004",
    date: "2024-11-20",
    status: "negado",
    items: [{ id: "6", name: "Espárrago Métrico M12", quantity: 30, description: "Acero Inoxidable" }],
    total: 450.0,
  },
]

export default function QuotationsPage() {
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null)
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null)
  const [editItems, setEditItems] = useState<QuotationItem[]>([])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      aprobado: "bg-green-100 text-green-800",
      en_revision: "bg-yellow-100 text-yellow-800",
      enviado: "bg-blue-100 text-blue-800",
      negado: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      aprobado: "Aprobado",
      en_revision: "En Revisión",
      enviado: "Enviado",
      negado: "Negado",
    }
    return labels[status] || status
  }

  const handleEdit = (quotation: Quotation) => {
    setEditingQuotation(quotation)
    setEditItems(JSON.parse(JSON.stringify(quotation.items)))
  }

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setEditItems(editItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  const handleRemoveItem = (itemId: string) => {
    setEditItems(editItems.filter((item) => item.id !== itemId))
  }

  const handleAddItem = () => {
    const newItem: QuotationItem = {
      id: `new-${Date.now()}`,
      name: "Nuevo Producto",
      quantity: 1,
      description: "Descripción",
    }
    setEditItems([...editItems, newItem])
  }

  // CONTENIDO PRINCIPAL
  const renderContent = () => {
    
    // 1. MODO EDICIÓN
    if (editingQuotation) {
      return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            {/* Header Edición */}
            <div className="mb-8">
              <button
                onClick={() => {
                  setEditingQuotation(null)
                  setSelectedQuotation(null)
                }}
                className="text-sm font-medium text-[#1975cc] hover:text-blue-700 mb-4 flex items-center gap-1"
              >
                <ChevronRight size={16} className="rotate-180" />
                Volver
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Editar Cotización {editingQuotation.number}</h1>
              <p className="text-gray-600 mt-2">Modifica los productos y cantidades de tu cotización</p>
            </div>

            {/* Edit Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Producto</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Descripción</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Cantidad</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {editItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-sm"
                            />
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Item Button */}
              <div className="border-t border-gray-200 p-6">
                <button
                  onClick={handleAddItem}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1975cc] hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  Agregar Producto
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setEditingQuotation(null)
                  setSelectedQuotation(null)
                }}
                className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button className="px-6 py-2 bg-[#1975cc] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Solicitar Envío de Cotización
              </button>
            </div>
        </div>
      );
    }

    // 2. MODO DETALLE
    if (selectedQuotation) {
      return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            {/* Header Detalle */}
            <div className="mb-8">
              <button
                onClick={() => setSelectedQuotation(null)}
                className="text-sm font-medium text-[#1975cc] hover:text-blue-700 mb-4 flex items-center gap-1"
              >
                <ChevronRight size={16} className="rotate-180" />
                Volver
              </button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Cotización {selectedQuotation.number}</h1>
                  <p className="text-gray-600 mt-2">
                    Fecha: {new Date(selectedQuotation.date).toLocaleDateString("es-AR")}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedQuotation.status)}`}
                >
                  {getStatusLabel(selectedQuotation.status)}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Productos en la Cotización</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Producto</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Descripción</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedQuotation.items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.description}</td>
                        <td className="px-4 py-3 text-center text-sm text-gray-900">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                <div className="w-full sm:w-64">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Subtotal:</span>
                    <span>${selectedQuotation.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-[#1975cc]">${selectedQuotation.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            {selectedQuotation.status !== "negado" && (
              <button
                onClick={() => handleEdit(selectedQuotation)}
                className="flex items-center gap-2 px-6 py-3 bg-[#1975cc] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Edit2 size={18} />
                Editar Cotización
              </button>
            )}
        </div>
      );
    }

    // 3. MODO LISTADO (Default)
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
          {/* Header Listado */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Mis Cotizaciones</h1>
            <p className="text-gray-600 mt-2">Visualiza el estado de todas tus cotizaciones y solicitudes</p>
          </div>

          {/* Quotations Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Número</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Productos</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockQuotations.map((quotation) => (
                    <tr key={quotation.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#1975cc]">{quotation.number}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(quotation.date).toLocaleDateString("es-AR")}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(quotation.status)}`}
                        >
                          {getStatusLabel(quotation.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">{quotation.items.length}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">${quotation.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedQuotation(quotation)}
                            className="p-2 text-[#1975cc] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <Eye size={18} />
                          </button>
                          {quotation.status !== "negado" && (
                            <button
                              onClick={() => handleEdit(quotation)}
                              className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {mockQuotations.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">No tienes cotizaciones aún</p>
              </div>
            )}
          </div>
      </div>
    );
  };

  // RETURN PRINCIPAL
  // AppLayout envuelve todo el contenido cambiante
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <main className="min-h-screen bg-gray-50">
        {renderContent()}
      </main>
    </AppLayout>
  );
}