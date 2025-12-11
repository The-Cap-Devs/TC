import AppLogoIcon from '@/components/app-logo-icon';
import WelcomeHeader from "@/components/welcome/header";
import Footer from '@/components/welcome/footer';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-svh flex flex-col bg-background/40 backdrop-blur-sm">
            <WelcomeHeader />

            {/* CONTENT */}
            <div className="flex flex-1 items-start justify-center sm:mt-10 px-4 py-30 sm:px-6 md:px-10">
                <div className="w-full max-w-xl md:max-w-3xl">

                    <div className="flex flex-col gap-8 md:gap-12">
                        <div className="flex flex-col items-center gap-4 md:gap-6">
                            {/* <Link
                                href={home()}
                                className="flex flex-col items-center gap-2"
                            >
                                <AppLogoIcon className="size-12 fill-current text-[var(--foreground)] dark:text-white" />
                            </Link> */}

                            <div className="space-y-2 md:space-y-3 text-center px-4">
                                <h1 className="text-4xl md:text-5xl font-black text-sky-600">
                                    {title}
                                </h1>

                                <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* CARD WRAPPER */}
                        <div className="bg-card shadow-lg border border-border 
                            rounded-xl p-5 sm:p-7 md:p-10">
                            {children}
                        </div>

                    </div>
                </div>
            </div>

            {/* FULL WIDTH FOOTER */}
            <Footer />
        </div>
    );
}
