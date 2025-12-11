import React, { useState, useRef, useEffect } from 'react';
import { Order, OrderStatus } from '../../types/types';
import { 
    ChevronDown, 
    ChevronUp, 
    Printer, 
    Download, 
    Search, 
    Filter, 
    Columns, 
    X, 
    Check, 
    Calendar,
    DollarSign,
    RefreshCw
} from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
}

interface ColumnConfig {
    id: string;
    label: string;
    visible: boolean;
    disableHide?: boolean; // For columns that shouldn't be hidden
}

const OrdersView: React.FC<OrdersViewProps> = ({ orders }) => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Column Visibility State
  const [columns, setColumns] = useState<ColumnConfig[]>([
      { id: 'date', label: 'Fecha', visible: true },
      { id: 'reference', label: 'Referencia', visible: true },
      { id: 'customer', label: 'Cliente', visible: true },
      { id: 'address', label: 'Dirección', visible: true },
      { id: 'nb_items', label: 'Nº Items', visible: true },
      { id: 'total_ex_taxes', label: 'Total base', visible: false },
      { id: 'delivery_fees', label: 'Gastos envío', visible: false },
      { id: 'taxes', label: 'Impuestos', visible: false },
      { id: 'total', label: 'Total', visible: true },
      { id: 'status', label: 'Estado', visible: true },
  ]);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [columnSearch, setColumnSearch] = useState('');

  // Active Filters State (Mocking the 'Add Filter' behavior)
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Click Outside logic for dropdowns
  const columnMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (columnMenuRef.current && !columnMenuRef.current.contains(event.target as Node)) {
        setShowColumnMenu(false);
      }
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- HANDLERS ---

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const toggleColumn = (columnId: string) => {
      setColumns(cols => cols.map(c => 
          c.id === columnId ? { ...c, visible: !c.visible } : c
      ));
  };

  const resetColumns = () => {
      setColumns(cols => cols.map(c => ({
          ...c,
          visible: ['date', 'reference', 'customer', 'address', 'nb_items', 'total', 'status'].includes(c.id)
      })));
  };

  const toggleFilter = (filter: string) => {
      if (activeFilters.includes(filter)) {
          setActiveFilters(activeFilters.filter(f => f !== filter));
      } else {
          setActiveFilters([...activeFilters, filter]);
      }
      setShowFilterMenu(false);
  };

  // --- FILTERING LOGIC ---

  const filteredOrders = orders.filter(order => {
      // 1. Tab Filter
      if (activeTab !== 'all' && order.status !== activeTab) return false;
      
      // 2. Search Query
      const searchLower = searchQuery.toLowerCase();
      if (searchQuery && !order.reference.toLowerCase().includes(searchLower) && !order.customer.name.toLowerCase().includes(searchLower)) {
          return false;
      }

      // 3. Dynamic Filters (Mock implementation)
      if (activeFilters.includes('high_value') && order.total < 100) return false;
      if (activeFilters.includes('recent') && new Date(order.date) < new Date('2023-10-24')) return false;

      return true;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'bg-green-100 text-green-700 border-green-200';
      case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case OrderStatus.CANCELLED: return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // --- RENDER HELPERS ---
  const isVisible = (id: string) => columns.find(c => c.id === id)?.visible;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Header & Tabs */}
      <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Cotizaciones (Pedidos)</h2>
            <div className="flex gap-2">
                 <button className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
                    <RefreshCw size={16} /> Actualizar
                 </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 flex gap-6 text-sm font-medium overflow-x-auto">
              {[
                  { id: 'all', label: 'Todos' },
                  { id: OrderStatus.PENDING, label: 'Pendientes' },
                  { id: OrderStatus.DELIVERED, label: 'Entregados' },
                  { id: OrderStatus.CANCELLED, label: 'Cancelados' }
              ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 border-b-2 px-1 transition-colors whitespace-nowrap ${
                        activeTab === tab.id 
                        ? 'border-indigo-600 text-indigo-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                      {tab.label}
                  </button>
              ))}
          </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        
        {/* Toolbar */}
        <div className="p-2 sm:p-4 border-b border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-50/50">
            
            {/* Search */}
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 w-full bg-white border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                
                {/* Active Filters Display */}
                {activeFilters.length > 0 && (
                     <div className="hidden lg:flex gap-2">
                        {activeFilters.map(filter => (
                            <span key={filter} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-medium animate-fade-in">
                                {filter === 'high_value' ? '> $100' : 'Recientes'}
                                <button onClick={() => toggleFilter(filter)} className="hover:bg-indigo-200 rounded-full"><X size={12}/></button>
                            </span>
                        ))}
                     </div>
                )}

                {/* Add Filter Dropdown */}
                <div className="relative" ref={filterMenuRef}>
                    <button 
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                        className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded text-sm font-medium transition-colors uppercase tracking-wide"
                    >
                        <Filter size={16} />
                        <span className="hidden sm:inline">Añadir Filtro</span>
                    </button>

                    {showFilterMenu && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-20 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                             <button 
                                onClick={() => toggleFilter('high_value')}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                             >
                                 <DollarSign size={14} className="text-slate-400" />
                                 Valor alto ({'>'}$100)
                                 {activeFilters.includes('high_value') && <Check size={14} className="ml-auto text-indigo-600"/>}
                             </button>
                             <button 
                                onClick={() => toggleFilter('recent')}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                             >
                                 <Calendar size={14} className="text-slate-400" />
                                 Recientes
                                 {activeFilters.includes('recent') && <Check size={14} className="ml-auto text-indigo-600"/>}
                             </button>
                        </div>
                    )}
                </div>

                {/* Columns Dropdown - The Complex One */}
                <div className="relative" ref={columnMenuRef}>
                    <button 
                        onClick={() => setShowColumnMenu(!showColumnMenu)}
                        className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors uppercase tracking-wide
                            ${showColumnMenu ? 'bg-indigo-50 text-indigo-700' : 'text-indigo-600 hover:bg-indigo-50'}
                        `}
                    >
                        <Columns size={16} />
                        <span className="hidden sm:inline">Columnas</span>
                    </button>

                    {showColumnMenu && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                             {/* Header Search */}
                             <div className="p-3 border-b border-slate-100">
                                 <div className="relative">
                                     <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                                     <input 
                                        type="text" 
                                        placeholder="Buscar columnas" 
                                        value={columnSearch}
                                        onChange={(e) => setColumnSearch(e.target.value)}
                                        className="w-full pl-8 pr-2 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-indigo-500"
                                     />
                                 </div>
                             </div>

                             {/* Column List */}
                             <div className="max-h-64 overflow-y-auto p-2 space-y-1">
                                 {columns
                                    .filter(col => col.label.toLowerCase().includes(columnSearch.toLowerCase()))
                                    .map(col => (
                                     <div key={col.id} className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer" onClick={() => toggleColumn(col.id)}>
                                         <span className="text-sm text-slate-700">{col.label}</span>
                                         {/* Custom Toggle Switch */}
                                         <div className={`w-9 h-5 rounded-full relative transition-colors duration-200 ${col.visible ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                                             <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full shadow-sm transition-transform duration-200 ${col.visible ? 'translate-x-4' : 'translate-x-0'}`} />
                                         </div>
                                     </div>
                                 ))}
                             </div>

                             {/* Footer Reset */}
                             <div className="p-2 border-t border-slate-100 bg-slate-50">
                                 <button 
                                    onClick={resetColumns}
                                    className="w-full py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 border border-indigo-200 rounded hover:bg-indigo-50 transition-colors"
                                 >
                                     Restablecer
                                 </button>
                             </div>
                        </div>
                    )}
                </div>

                <button className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded text-sm font-medium transition-colors uppercase tracking-wide">
                    <Download size={16} />
                    <span className="hidden sm:inline">Exportar</span>
                </button>
            </div>
        </div>

        {/* Filters Bar (if items selected) */}
        {activeFilters.length > 0 && (
            <div className="bg-indigo-50/50 px-4 py-2 border-b border-indigo-100 flex items-center gap-2 text-sm text-indigo-800 lg:hidden">
                <span className="font-medium">Filtros activos:</span>
                {activeFilters.map(f => f === 'high_value' ? '> $100' : 'Recientes').join(', ')}
            </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 w-12 bg-slate-50 sticky left-0 z-10"></th>
                {isVisible('date') && <th className="px-6 py-3 cursor-pointer hover:bg-slate-100 transition-colors group">Fecha <ChevronDown size={12} className="inline ml-1 opacity-0 group-hover:opacity-100" /></th>}
                {isVisible('reference') && <th className="px-6 py-3">Referencia</th>}
                {isVisible('customer') && <th className="px-6 py-3">Cliente</th>}
                {isVisible('address') && <th className="px-6 py-3">Dirección</th>}
                {isVisible('nb_items') && <th className="px-6 py-3 text-center">Items</th>}
                {isVisible('total_ex_taxes') && <th className="px-6 py-3 text-right">Total Base</th>}
                {isVisible('delivery_fees') && <th className="px-6 py-3 text-right">Envío</th>}
                {isVisible('taxes') && <th className="px-6 py-3 text-right">Impuestos</th>}
                {isVisible('total') && <th className="px-6 py-3 text-right">Total</th>}
                {isVisible('status') && <th className="px-6 py-3 text-center">Estado</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const isExpanded = expandedOrderId === order.id;
                    return (
                      <React.Fragment key={order.id}>
                        {/* Main Row */}
                        <tr 
                            className={`hover:bg-indigo-50/30 transition-colors cursor-pointer group ${isExpanded ? 'bg-indigo-50/40' : ''}`}
                            onClick={() => toggleExpand(order.id)}
                        >
                          <td className="px-6 py-4 text-slate-400 sticky left-0 bg-white group-hover:bg-indigo-50/30 transition-colors z-10 border-r border-transparent group-hover:border-slate-100">
                            {isExpanded ? <ChevronUp size={18} className="text-indigo-600" /> : <ChevronDown size={18} />}
                          </td>
                          {isVisible('date') && <td className="px-6 py-4 whitespace-nowrap text-slate-600">{new Date(order.date).toLocaleDateString()}</td>}
                          {isVisible('reference') && <td className="px-6 py-4 font-mono font-medium text-indigo-600">{order.reference}</td>}
                          {isVisible('customer') && (
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img src={order.customer.avatar} alt="" className="w-6 h-6 rounded-full" />
                                    <span className="font-medium text-slate-700">{order.customer.name}</span>
                                </div>
                              </td>
                          )}
                          {isVisible('address') && <td className="px-6 py-4 text-slate-500 truncate max-w-xs">{order.customer.address}, {order.customer.city}</td>}
                          {isVisible('nb_items') && <td className="px-6 py-4 text-center text-slate-600">{order.items.length}</td>}
                          
                          {isVisible('total_ex_taxes') && <td className="px-6 py-4 text-right text-slate-600">${(order.total - order.taxes - order.deliveryFees).toFixed(2)}</td>}
                          {isVisible('delivery_fees') && <td className="px-6 py-4 text-right text-slate-600">${order.deliveryFees.toFixed(2)}</td>}
                          {isVisible('taxes') && <td className="px-6 py-4 text-right text-slate-600">${order.taxes.toFixed(2)}</td>}
                          
                          {isVisible('total') && <td className="px-6 py-4 text-right font-bold text-slate-700">${order.total.toFixed(2)}</td>}
                          {isVisible('status') && (
                              <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                              </td>
                          )}
                        </tr>

                        {/* Expanded Row (Detail) */}
                        {isExpanded && (
                          <tr className="bg-slate-50/50 shadow-inner">
                            <td colSpan={columns.filter(c => c.visible).length + 1} className="p-0 border-b border-slate-200">
                                <div className="p-4 sm:p-8 cursor-default bg-slate-50/50">
                                    <div className="bg-white max-w-4xl mx-auto rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                                        <div className="p-8">
                                            {/* Header */}
                                            <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
                                                <div>
                                                    <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white text-sm">PG</div>
                                                        Posters Galore
                                                    </h3>
                                                </div>
                                                <div className="text-right">
                                                    <h3 className="text-lg font-medium text-slate-600">Factura #{order.id}</h3>
                                                    <div className="mt-2 flex gap-2 justify-end">
                                                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Imprimir">
                                                            <Printer size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Info Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                                                <div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Facturar a</p>
                                                    <div className="flex items-start gap-4">
                                                        <img src={order.customer.avatar} className="w-12 h-12 rounded-full" alt="" />
                                                        <div>
                                                            <p className="font-bold text-slate-800 text-lg">{order.customer.name}</p>
                                                            <p className="text-slate-600">{order.customer.address}</p>
                                                            <p className="text-slate-600">{order.customer.city}, {order.customer.zipcode}</p>
                                                            <p className="text-indigo-600 text-sm mt-1">{order.customer.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="md:text-right space-y-2">
                                                    <div className="flex justify-between md:justify-end gap-4">
                                                        <span className="text-slate-500">Fecha Pedido:</span>
                                                        <span className="font-medium text-slate-800">{new Date(order.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex justify-between md:justify-end gap-4">
                                                        <span className="text-slate-500">Referencia:</span>
                                                        <span className="font-mono text-slate-800 bg-slate-100 px-2 rounded text-sm">{order.reference}</span>
                                                    </div>
                                                    <div className="flex justify-between md:justify-end gap-4">
                                                        <span className="text-slate-500">Estado:</span>
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide border ${getStatusColor(order.status)}`}>
                                                          {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Basket */}
                                            <div className="border border-slate-200 rounded-lg overflow-hidden mb-8">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
                                                        <tr>
                                                            <th className="text-left py-3 px-4">Producto</th>
                                                            <th className="text-right py-3 px-4">Precio Unit.</th>
                                                            <th className="text-right py-3 px-4">Cantidad</th>
                                                            <th className="text-right py-3 px-4">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100">
                                                        {order.items.map((item, idx) => (
                                                            <tr key={idx}>
                                                                <td className="py-3 px-4 text-slate-800 font-medium">{item.productName}</td>
                                                                <td className="py-3 px-4 text-right text-slate-600">${item.unitPrice.toFixed(2)}</td>
                                                                <td className="py-3 px-4 text-right text-slate-600">{item.quantity}</td>
                                                                <td className="py-3 px-4 text-right font-bold text-slate-800">${(item.unitPrice * item.quantity).toFixed(2)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Summary */}
                                            <div className="flex justify-end">
                                                <div className="w-full sm:w-64 space-y-3">
                                                    <div className="flex justify-between text-sm text-slate-500">
                                                        <span>Subtotal</span>
                                                        <span>${(order.total - order.taxes - order.deliveryFees).toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm text-slate-500">
                                                        <span>Impuestos</span>
                                                        <span>${order.taxes.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm text-slate-500">
                                                        <span>Envío</span>
                                                        <span>${order.deliveryFees.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-lg font-bold text-slate-800 pt-3 border-t border-slate-200">
                                                        <span>Total</span>
                                                        <span>${order.total.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
              ) : (
                  <tr>
                      <td colSpan={columns.filter(c => c.visible).length + 1} className="py-12 text-center text-slate-500">
                          No se encontraron pedidos que coincidan con los filtros.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Mock) */}
        <div className="border-t border-slate-200 p-4 flex items-center justify-between bg-slate-50 text-sm text-slate-500">
             <span>Filas por página: <span className="font-medium text-slate-700">25</span></span>
             <div className="flex items-center gap-4">
                 <span>1-{filteredOrders.length} de {filteredOrders.length}</span>
                 <div className="flex gap-1">
                     <button disabled className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"><ChevronDown className="rotate-90" size={16}/></button>
                     <button disabled className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"><ChevronDown className="-rotate-90" size={16}/></button>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
