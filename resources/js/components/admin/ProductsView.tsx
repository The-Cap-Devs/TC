import React from 'react';
import { Product } from '../../types/types';
import { Edit, Trash2, X } from 'lucide-react';

interface ProductsViewProps {
  products: Product[];
  filterCategoryId?: string | null;
  onClearFilter?: () => void;
}

const ProductsView: React.FC<ProductsViewProps> = ({ products, filterCategoryId, onClearFilter }) => {
  const displayedProducts = filterCategoryId 
    ? products.filter(p => p.categoryId === filterCategoryId)
    : products;

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-800">Productos</h2>
                {filterCategoryId && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        <span>Filtro: Categoría Activa</span>
                        <button onClick={onClearFilter} className="hover:bg-indigo-200 rounded-full p-0.5"><X size={14} /></button>
                    </div>
                )}
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                + Añadir Producto
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-700 shadow-sm">
                            {product.reference}
                        </div>
                        {product.stock <= 5 && (
                             <div className="absolute bottom-2 left-2 bg-red-500/90 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                                {product.stock === 0 ? 'Agotado' : 'Bajo Stock'}
                            </div>
                        )}
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-slate-800 line-clamp-1" title={product.name}>{product.name}</h3>
                            </div>
                        </div>
                        
                        <div className="flex items-end justify-between mt-auto pt-4">
                            <div>
                                <p className="text-xs text-slate-500">Precio</p>
                                <p className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                                    <Edit size={18} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                             <span>Stock: {product.stock} u.</span>
                             <span>Ventas: {product.sales}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {displayedProducts.length === 0 && (
             <div className="text-center py-12 text-slate-500">
                No se encontraron productos para esta selección.
             </div>
        )}
    </div>
  );
};

export default ProductsView;