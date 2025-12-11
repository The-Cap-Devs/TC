import AppLayout from '@/layouts/app-layout';
import { breadcrumbs } from './dashboard';
import { useState, useMemo } from "react"
import { Link } from "@inertiajs/react"
import { Search, Filter, ChevronDown, ShoppingCart, Star } from "lucide-react"


interface BreadcrumbItem {
  title: string
  href: string
}

interface Product {
  id: number
  sku: string
  name: string
  category: string
  material: string
  diameter: string
  headType: string
  image: string
  stock: number
  rating: number
  description: string
}

const products: Product[] = [
  {
    id: 1,
    sku: "TM-8-50",
    name: "Tornillo Métrico M8 x 50mm",
    category: "Tornillos Métricos",
    material: "Acero Galvanizado",
    diameter: "8mm",
    headType: "Cabeza Hexagonal",
    image: "/tornillo-metrico-acero.jpg",
    stock: 500,
    rating: 4.8,
    description: "Acabado brillante",
  },
  {
    id: 2,
    sku: "TH-M8",
    name: "Tuerca Hexagonal M8",
    category: "Tuercas",
    material: "Aleación de Acero",
    diameter: "8mm",
    headType: "Hexagonal",
    image: "/tuerca-hexagonal.jpg",
    stock: 800,
    rating: 4.6,
    description: "Resistente",
  },
  {
    id: 3,
    sku: "AR-8-PL",
    name: "Arandela Plana M8",
    category: "Arandelas",
    material: "Acero Inoxidable 304",
    diameter: "8mm",
    headType: "Plana",
    image: "/arandela-metalica.jpg",
    stock: 1200,
    rating: 4.5,
    description: "Alta durabilidad",
  },
  {
    id: 4,
    sku: "PB-10-CR",
    name: "Perno Cabeza Redonda M10",
    category: "Pernos",
    material: "Acero Galvanizado",
    diameter: "10mm",
    headType: "Cabeza Redonda",
    image: "/perno-cabeza-redonda.jpg",
    stock: 350,
    rating: 4.7,
    description: "Tipo Carriage",
  },
  {
    id: 5,
    sku: "TA-10",
    name: "Tornillo Autorroscante #10",
    category: "Tornillos Autorroscantes",
    material: "Acero Templado",
    diameter: "10mm",
    headType: "Cabeza Cónica",
    image: "/tornillo-autorroscante.jpg",
    stock: 600,
    rating: 4.4,
    description: "Para chapas",
  },
  {
    id: 6,
    sku: "RM-4-10",
    name: "Remache Aluminio 4x10",
    category: "Remaches",
    material: "Aluminio",
    diameter: "4mm",
    headType: "Cabeza Redonda",
    image: "/remache-aluminio.jpg",
    stock: 400,
    rating: 4.3,
    description: "Lightweight",
  },
  {
    id: 7,
    sku: "ES-12-100",
    name: "Espárrago M12 x 100mm",
    category: "Espárragos",
    material: "Acero Galvanizado",
    diameter: "12mm",
    headType: "Roscado",
    image: "/esparrago-metalico.jpg",
    stock: 250,
    rating: 4.6,
    description: "Calidad industrial",
  },
  {
    id: 8,
    sku: "PS-3-20",
    name: "Pasador Cilíndrico 3x20",
    category: "Pasadores",
    material: "Acero Templado",
    diameter: "3mm",
    headType: "Cilíndrico",
    image: "/pasador-cilindrico.jpg",
    stock: 700,
    rating: 4.5,
    description: "Dureza Rc 42-52",
  },
  {
    id: 9,
    sku: "TR-M6",
    name: "Tirador Roscado M6",
    category: "Tiradores",
    material: "Aluminio",
    diameter: "6mm",
    headType: "Roscado",
    image: "/tirador-roscado.jpg",
    stock: 180,
    rating: 4.7,
    description: "Con inserto",
  },
  {
    id: 10,
    sku: "CH-5-5",
    name: "Chaveta Cuadrada 5x5x25",
    category: "Chavetas",
    material: "Acero al Carbono",
    diameter: "5mm",
    headType: "Cuadrada",
    image: "/chaveta-cuadrada.jpg",
    stock: 520,
    rating: 4.4,
    description: "DIN 6880",
  },
  {
    id: 11,
    sku: "AR-8-PR",
    name: "Arandela Presión M8",
    category: "Arandelas",
    material: "Acero Galvanizado",
    diameter: "8mm",
    headType: "Presión",
    image: "/arandela-presion.jpg",
    stock: 900,
    rating: 4.8,
    description: "Antisoltado",
  },
  {
    id: 12,
    sku: "TUA-M10",
    name: "Tuerca Autoblocante M10",
    category: "Tuercas",
    material: "Nylon Autoblocante",
    diameter: "10mm",
    headType: "Hexagonal",
    image: "/tuerca-autoblocante.jpg",
    stock: 320,
    rating: 4.9,
    description: "Antisoltado",
  },
  {
    id: 13,
    sku: "TM-6-40",
    name: "Tornillo Métrico M6 x 40mm",
    category: "Tornillos Métricos",
    material: "Acero Inoxidable 316",
    diameter: "6mm",
    headType: "Cabeza Hexagonal",
    image: "/tornillo-metrico-acero.jpg",
    stock: 450,
    rating: 4.7,
    description: "Resistencia a corrosión",
  },
  {
    id: 14,
    sku: "TM-10-60",
    name: "Tornillo Métrico M10 x 60mm",
    category: "Tornillos Métricos",
    material: "Acero Galvanizado",
    diameter: "10mm",
    headType: "Cabeza Hexagonal",
    image: "/tornillo-metrico-acero.jpg",
    stock: 380,
    rating: 4.6,
    description: "Acabado brillante",
  },
  {
    id: 15,
    sku: "TH-M6",
    name: "Tuerca Hexagonal M6",
    category: "Tuercas",
    material: "Aleación de Acero",
    diameter: "6mm",
    headType: "Hexagonal",
    image: "/tuerca-hexagonal.jpg",
    stock: 750,
    rating: 4.5,
    description: "Estándar DIN",
  },
  {
    id: 16,
    sku: "TH-M12",
    name: "Tuerca Hexagonal M12",
    category: "Tuercas",
    material: "Acero Galvanizado",
    diameter: "12mm",
    headType: "Hexagonal",
    image: "/tuerca-hexagonal.jpg",
    stock: 600,
    rating: 4.7,
    description: "Acabado galvanizado",
  },
]

const categories = ["Todos", ...new Set(products.map((p) => p.category))]
const materials = ["Todos", ...new Set(products.map((p) => p.material))]
const diameters = ["Todos", ...new Set(products.map((p) => p.diameter))]
const headTypes = ["Todos", ...new Set(products.map((p) => p.headType))]

const sortOptions = [
  { label: "Relevancia", value: "relevant" },
  { label: "Mejor Calificación", value: "rating" },
  { label: "Más Stock", value: "popular" },
  { label: "Nombre A-Z", value: "name-asc" },
]

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedMaterial, setSelectedMaterial] = useState("Todos")
  const [selectedDiameter, setSelectedDiameter] = useState("Todos")
  const [selectedHeadType, setSelectedHeadType] = useState("Todos")
  const [sortBy, setSortBy] = useState("relevant")
  const [showFilters, setShowFilters] = useState(false)
  const [cartItems, setCartItems] = useState<Array<{ id: number; quantity: number }>>([])

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
      const matchesMaterial = selectedMaterial === "Todos" || product.material === selectedMaterial
      const matchesDiameter = selectedDiameter === "Todos" || product.diameter === selectedDiameter
      const matchesHeadType = selectedHeadType === "Todos" || product.headType === selectedHeadType

      return matchesSearch && matchesCategory && matchesMaterial && matchesDiameter && matchesHeadType
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "popular":
          return b.stock - a.stock
        case "name-asc":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedMaterial, selectedDiameter, selectedHeadType, sortBy])

  const handleAddToCart = (productId: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productId)
      if (existing) {
        return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { id: productId, quantity: 1 }]
    })
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Todos")
    setSelectedMaterial("Todos")
    setSelectedDiameter("Todos")
    setSelectedHeadType("Todos")
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="min-h-screen mt-10 bg-white flex flex-col">

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Page Header */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Catálogo de Productos</h1>
            <p className="text-sm text-gray-600 mt-1">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/cart"
            className="relative bg-[#1975cc] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Pedido
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por SKU, nombre, descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#1975cc] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className={`lg:w-56 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-between mb-4 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Filter size={16} />
                Filtros
              </span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            <div className="space-y-4">
              {/* Categories Filter */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Categoría</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-[#1975cc] border-gray-300 cursor-pointer"
                      />
                      <span className="ml-2.5 text-xs text-gray-700 hover:text-gray-900">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material Filter */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Material</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {materials.map((material) => (
                    <label key={material} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="material"
                        checked={selectedMaterial === material}
                        onChange={() => setSelectedMaterial(material)}
                        className="w-4 h-4 text-[#1975cc] border-gray-300 cursor-pointer"
                      />
                      <span className="ml-2.5 text-xs text-gray-700 hover:text-gray-900">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Diameter Filter */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Diámetro</h3>
                <div className="space-y-2">
                  {diameters.map((diameter) => (
                    <label key={diameter} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="diameter"
                        checked={selectedDiameter === diameter}
                        onChange={() => setSelectedDiameter(diameter)}
                        className="w-4 h-4 text-[#1975cc] border-gray-300 cursor-pointer"
                      />
                      <span className="ml-2.5 text-xs text-gray-700 hover:text-gray-900">{diameter}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Head Type Filter */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Tipo de Cabeza</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {headTypes.map((headType) => (
                    <label key={headType} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="headType"
                        checked={selectedHeadType === headType}
                        onChange={() => setSelectedHeadType(headType)}
                        className="w-4 h-4 text-[#1975cc] border-gray-300 cursor-pointer"
                      />
                      <span className="ml-2.5 text-xs text-gray-700 hover:text-gray-900">{headType}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                Limpiar Filtros
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Control */}
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs text-gray-600">
                {filteredProducts.length} resultado{filteredProducts.length !== 1 ? "s" : ""}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#1975cc] cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Products Grid - Compact cards with 4 columns on desktop, 3 on tablet, 2 on mobile */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col"
                  >
                    {/* Product Image */}
                    <div className="relative h-32 bg-gray-100 overflow-hidden flex items-center justify-center">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {product.stock < 100 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                          Bajo
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-2.5 flex-1 flex flex-col">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.sku}</p>
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-xs hover:text-[#1975cc] transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-1.5 flex-1">{product.description}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>

                      {/* Stock Info */}
                      <p className="text-xs text-gray-500 mb-2">{product.stock} en stock</p>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full bg-[#1975cc] text-white py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-sm mb-1">No se encontraron productos</p>
                <p className="text-gray-500 text-xs">Intenta con otros filtros o búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
    </AppLayout>
    
  )
}
