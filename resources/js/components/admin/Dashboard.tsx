import React from 'react';
import { DollarSign, ShoppingBag, Users, AlertCircle } from 'lucide-react';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import RecentOrders from './RecentOrders';
import PendingReviews from './PendingReviews';
import { REVENUE_DATA, RECENT_ORDERS, PENDING_REVIEWS } from '../../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-slate-500 mt-1">Bienvenido de nuevo, aquí tienes un resumen de hoy.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            Descargar Reporte
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
            + Nuevo Producto
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Ingresos Totales" 
          value="$24,500" 
          icon={DollarSign} 
          trend="12% vs mes anterior" 
          trendUp={true}
          colorClass="bg-emerald-100 text-emerald-600"
        />
        <StatCard 
          title="Nuevos Pedidos" 
          value="154" 
          icon={ShoppingBag} 
          trend="8% vs mes anterior" 
          trendUp={true}
          colorClass="bg-blue-100 text-blue-600"
        />
        <StatCard 
          title="Nuevos Clientes" 
          value="32" 
          icon={Users} 
          trend="2% vs mes anterior" 
          trendUp={false}
          colorClass="bg-amber-100 text-amber-600"
        />
        <StatCard 
          title="Reseñas Pendientes" 
          value="12" 
          icon={AlertCircle} 
          colorClass="bg-rose-100 text-rose-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart takes up 2/3 on large screens */}
        <div className="lg:col-span-2">
          <RevenueChart data={REVENUE_DATA} />
        </div>
        
        {/* Reviews take up 1/3 */}
        <div className="lg:col-span-1 h-96">
           <PendingReviews reviews={PENDING_REVIEWS} />
        </div>
      </div>

      {/* Recent Orders Table full width */}
      <div className="w-full">
        <RecentOrders orders={RECENT_ORDERS} />
      </div>
    </div>
  );
};

export default Dashboard;