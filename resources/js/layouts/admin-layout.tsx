import React, { useState } from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";

interface Props {
    children: React.ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);


    const [currentView, setCurrentView] = useState("dashboard");

    return (
        <div className="flex h-screen overflow-hidden bg-slate-100">

            {/* Sidebar */}
            <Sidebar
                currentView={currentView}
                onChangeView={(v) => setCurrentView(v)}
                isOpen={sidebarOpen}
            />

            {/* Contenido principal */}
            <div className="flex flex-col flex-1 min-w-0">

                {/* Header */}
                <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                {/* Contenido interno */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
