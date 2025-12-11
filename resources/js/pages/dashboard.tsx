import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { HeroCarousel } from '@/components/dashboard/hero-carousel';
import Footer from '@/components/welcome/footer';
import CategoriesSection from '@/components/welcome/categories-section';
import { LastPurchasedSection } from '@/components/dashboard/last-purchased-section';

export const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Inicio',
    href: dashboard().url,
  },
];


export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Inicio" />
      <div className="width-full space-y-6">

        <HeroCarousel />

        <CategoriesSection />

        <LastPurchasedSection />
        
      </div>
    </AppLayout>
  );
}
