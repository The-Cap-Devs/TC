"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Compra 1. Obtén Millones.",
    subtitle: "En todos nuestros tornillos de acero inoxidable estándar y herrajes.",
    image: "img/hero-carousel/1.jpg",
    cta: "Explorar Productos",
  },
  {
    id: 2,
    title: "Máxima Calidad Garantizada",
    subtitle: "Productos de la mejor calidad para tus proyectos de construcción y manufactura.",
    image: "img/hero-carousel/2.jpg",
    cta: "Ver Catálogo",
  },
  {
    id: 3,
    title: "Entrega Rápida",
    subtitle: "Stock disponible y envío a toda la nación en 24-48 horas.",
    image: "img/hero-carousel/3.jpg",
    cta: "Solicitar Cotización",
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (!isAutoplay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoplay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setIsAutoplay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoplay(false)
  }

  const slide = slides[current]

  return (
    <div className="relative w-full h-150 overflow-hidden  bg-gray-900">
      <div className="relative w-full h-full">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={s.image || "/placeholder.svg"} alt={s.title} className="w-full h-full object-cover" />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto px-4 sm:px-6 lg:px-40 w-full">
                <div className="max-w-2xl">
                  <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{s.title}</h1>
                  <p className="text-lg text-gray-100 mb-8">{s.subtitle}</p>
                  <button className="bg-[#1975cc] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    {s.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              setIsAutoplay(false)
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
