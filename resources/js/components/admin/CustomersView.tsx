import React from 'react';
import { Customer } from '../../types/types';
import { Mail, MapPin, Calendar, ShoppingBag } from 'lucide-react';

interface CustomersViewProps {
  customers: Customer[];
}

const CustomersView: React.FC<CustomersViewProps> = ({ customers }) => {
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Clientes</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                + Nuevo Cliente
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {customers.map((customer) => (
                <div key={customer.id} className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <img src={customer.avatar} alt={customer.name} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">{customer.name}</h3>
                                <div className="flex items-center gap-1 text-slate-500 text-sm">
                                    <MapPin size={14} />
                                    {customer.city}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2 rounded">
                            <Mail size={16} className="text-slate-400" />
                            <span className="truncate">{customer.email}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-semibold">Pedidos</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <ShoppingBag size={16} className="text-indigo-500" />
                                    <span className="font-bold text-slate-800">{customer.ordersCount}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-semibold">Total Gastado</p>
                                <p className="font-bold text-slate-800 mt-1">${customer.totalSpent.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                            <Calendar size={12} />
                            Visto por última vez: {new Date(customer.lastSeen).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default CustomersView;