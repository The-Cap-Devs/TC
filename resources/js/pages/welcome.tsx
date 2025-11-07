import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import HeroSection from '@/components/welcome/hero-section';
import WelcomeHeader from "@/components/welcome/header";



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
            <div className="flex  flex-col items-center bg-[#FDFDFC] text-[#1b1b18] lg:justify-center dark:bg-[#0a0a0a]">
                
                <WelcomeHeader canRegister={canRegister} />
                
                    <main className="w-full">
                        <HeroSection />
                    </main>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
