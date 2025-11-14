import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ShoppingCart, SquareChartGantt, FileText } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Inicio',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Carrito de compras',
        href: dashboard(),
        icon: ShoppingCart,
    },
    {
        title: 'Catálogo',
        href: dashboard(),
        icon: SquareChartGantt,
    },
    {
        title: 'Cotizaciones',
        href: dashboard(),
        icon: FileText,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>

                            <Link href={dashboard()} prefetch>
                                {/* Logo */}
                                <div className="flex justify-start w-auto">
                                <img
                                    src="./img/logos/logo3.png"
                                    alt="Tornillos El Capitán"
                                    className="
                                    h-14 sm:h-20 md:h-24
                                    object-contain
                                    aspect-[6/1]
                                    transition-all
                                    duration-300
                                    "
                                />
                                </div>

                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
