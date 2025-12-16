import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import HeroSection from '@/components/welcome/hero-section';
import StatsSection from '@/components/welcome/stats';
import WelcomeHeader from "@/components/welcome/header";
import CategoriesSection from "@/components/welcome/categories-section";
import Accordion from '@/components/welcome/faq';
import HowToQuoteSection from '@/components/welcome/how-to';
import Footer from '@/components/welcome/footer';
import CTASection from '@/components/welcome/CTASection';
import "../../css/animations/welcome-bg.css";

export default function Welcome({
  canRegister = true,
}: {
  canRegister?: boolean;
}) {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>

      {/* --- Contenido principal --- */}
        <div className="flex flex-col items-center bg-transparent text-[#1b1b18] lg:justify-center dark:bg-transparent">
            <WelcomeHeader canRegister={canRegister} />

            <main className="w-full">
              <HeroSection />
              <StatsSection />

              <div className="container flex mx-auto px-4 mt-20">
                <CategoriesSection />
              </div>

              <div className='container flex mx-auto px-4 mt-20'>
                <HowToQuoteSection />
              </div>  
                  
              <Accordion />

              <CTASection />

              <Footer />
            </main>
        </div>
    </>
  );
}
