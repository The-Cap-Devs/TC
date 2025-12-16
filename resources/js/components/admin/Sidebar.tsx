import React, { useState } from 'react';
import { LayoutDashboard, ShoppingCart, Users, Image, MessageSquare, Settings, LogOut, ChevronDown, ChevronRight, Grid } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen }) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(true);

  const isCatalogActive = currentView.startsWith('catalog-');

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col h-screen shadow-xl`}
    >
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">P</span>
          </div>
          <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Posters Galore</span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu Principal</p>
        
        <button
          onClick={() => onChangeView('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
            currentView === 'dashboard'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <LayoutDashboard size={20} className={`${currentView === 'dashboard' ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors`} />
          Dashboard
        </button>

        <button
          onClick={() => onChangeView('orders')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
            currentView === 'orders'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShoppingCart size={20} className={`${currentView === 'orders' ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors`} />
          Pedidos
        </button>

        {/* Catalog Submenu */}
        <div>
            <button
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isCatalogActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                 <Grid size={20} className={`${isCatalogActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white'} transition-colors`} />
                 Catálogo
              </div>
              {isCatalogOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {isCatalogOpen && (
                <div className="ml-9 mt-1 space-y-1 border-l border-slate-700 pl-2">
                     <button
                        onClick={() => onChangeView('catalog-products')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                            currentView === 'catalog-products'
                            ? 'text-indigo-400 bg-slate-800/50' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        >
                        Productos
                    </button>
                    <button
                        onClick={() => onChangeView('catalog-categories')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                            currentView === 'catalog-categories'
                            ? 'text-indigo-400 bg-slate-800/50' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        >
                        Categorías
                    </button>
                </div>
            )}
        </div>

        <button
          onClick={() => onChangeView('customers')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
            currentView === 'customers'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users size={20} className={`${currentView === 'customers' ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors`} />
          Clientes
        </button>

        <button
          onClick={() => onChangeView('reviews')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
            currentView === 'reviews'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <MessageSquare size={20} className={`${currentView === 'reviews' ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors`} />
          Reseñas
        </button>

        <div className="pt-8 mt-8 border-t border-slate-800">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Configuración</p>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <Settings size={20} />
            Ajustes
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors">
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;