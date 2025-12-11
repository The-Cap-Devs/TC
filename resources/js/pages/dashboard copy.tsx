import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Inicio',
    href: dashboard().url,
  },
];

// --- Datos de ejemplo ---
const sampleQuotes = [
  { id: '#Q-1023', date: '2025-10-28', status: 'Pendiente', total: '$120.00' },
  { id: '#Q-1019', date: '2025-09-15', status: 'En revisión', total: '$340.00' },
  { id: '#Q-1003', date: '2025-07-01', status: 'Aceptada', total: '$2,100.00' },
];

const categories = [
  {
    title: 'Tornillos de cabeza hexagonal',
    description: 'Ideales para estructuras y maquinaria pesada.',
    image: '/img/products/3000_FT.png',
  },
  {
    title: 'Tuercas y pernos',
    description: 'Perfectos para fijaciones en metal y plástico.',
    image: '/img/products/3300.png',
  },
  {
    title: 'Arandelas',
    description: 'Complementos esenciales para asegurar tus uniones.',
    image: '/img/products/3400.png',
  },
  {
    title: 'Tornillos autorroscantes',
    description: 'Usados en carpintería y ensamblajes decorativos.',
    image: '/img/products/3180.png',
  },
  {
    title: 'Tornillos de cabeza hexagonal',
    description: 'Ideales para estructuras y maquinaria pesada.',
    image: '/img/products/3000_FT.png',
  },
  {
    title: 'Tuercas y pernos',
    description: 'Perfectos para fijaciones en metal y plástico.',
    image: '/img/products/3300.png',
  },
  {
    title: 'Arandelas',
    description: 'Complementos esenciales para asegurar tus uniones.',
    image: '/img/products/3400.png',
  },
  {
    title: 'Tornillos autorroscantes',
    description: 'Usados en carpintería y ensamblajes decorativos.',
    image: '/img/products/3180.png',
  },
  {
    title: 'Tornillos de cabeza hexagonal',
    description: 'Ideales para estructuras y maquinaria pesada.',
    image: '/img/products/3000_FT.png',
  },
  {
    title: 'Tuercas y pernos',
    description: 'Perfectos para fijaciones en metal y plástico.',
    image: '/img/products/3300.png',
  },
  {
    title: 'Arandelas',
    description: 'Complementos esenciales para asegurar tus uniones.',
    image: '/img/products/3400.png',
  },
  {
    title: 'Tornillos autorroscantes',
    description: 'Usados en carpintería y ensamblajes decorativos.',
    image: '/img/products/3180.png',
  },
];

const recentProducts = [
  {
    image: '/img/products/3000_FT.png',
    description: 'Tornillo hexagonal galvanizado 1/2” x 2”',
  },
  {
    image: '/img/products/3300.png',
    description: 'Tuerca de presión M10 acero inoxidable',
  },
  {
    image: '/img/products/3400.png',
    description: 'Arandela plana 3/8” reforzada',
  },
  {
    image: '/img/products/3180.png',
    description: 'Tornillo autorroscante para madera #8 x 1”',
  },
];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Inicio" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

        {/* --- Sección superior --- */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">

          {/* Card de Estado de Cotizaciones */}
          <Card className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-lg font-semibold">Estado de Cotizaciones</CardTitle>
            </CardHeader>

            <CardContent className="px-4 pb-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleQuotes.map((q) => (
                      <TableRow key={q.id}>
                        <TableCell className="font-medium">{q.id}</TableCell>
                        <TableCell>{q.date}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${q.status === 'Aceptada'
                                ? 'bg-green-100 text-green-800'
                                : q.status === 'Pendiente'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                          >
                            {q.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{q.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>

            <CardFooter className="px-4 py-3 flex items-center justify-start">
              <Link href="/quotes">
                <Button variant="ghost" size="sm">Ver más</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* --- Tabla de artículos buscados recientemente --- */}
          <Card className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-lg font-semibold">Artículos buscados recientemente</CardTitle>
            </CardHeader>

            <CardContent className="px-4 pb-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead className="text-center">Cantidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentProducts.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <img
                            src={item.image}
                            alt={item.description}
                            className="w-14 h-10 object-contain rounded-md border border-neutral-200 dark:border-neutral-700"
                          />
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {item.description}
                        </TableCell>
                        <TableCell className="text-center">
                          <Input
                            type="number"
                            min={0}
                            placeholder="0"
                            className="w-20 h-8 text-center"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- Sección inferior: Categorías --- */}
        <section className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
          <h2 className="text-xl font-semibold mb-6">Categorías</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="group bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm border border-neutral-200/50 dark:border-neutral-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[7/2] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 group-hover:brightness-102"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-base">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </AppLayout>
  );
}
