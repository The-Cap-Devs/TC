import React from 'react';
import { Bell, Search, Menu, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md md:hidden"
        >
          <Menu size={24} />
        </button>
        
        {/* Search Bar - Hidden on mobile, usually would open a modal */}
        <div className="hidden md:flex items-center relative max-w-md w-full">
          <Search className="absolute left-3 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar pedidos, clientes..." 
            className="pl-10 pr-4 py-2 w-64 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors hidden sm:block">
          <HelpCircle size={20} />
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        <button className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-700">Admin Usuario</p>
            <p className="text-xs text-slate-500">Gerente</p>
          </div>
          <img 
            src="https://picsum.photos/id/433/100/100" 
            alt="User" 
            className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;