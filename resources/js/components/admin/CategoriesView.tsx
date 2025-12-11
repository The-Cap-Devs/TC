import React, { useState } from 'react';
import { Category, Product } from '../../types/types';
import { Edit, Image as ImageIcon, ArrowLeft, Save, Plus } from 'lucide-react';

interface CategoriesViewProps {
  categories: Category[];
  products: Product[];
  onFilterProductsByCategory: (categoryId: string) => void;
}

const CategoriesView: React.FC<CategoriesViewProps> = ({ categories, products, onFilterProductsByCategory }) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  // Handlers
  const handleEditClick = (category: Category) => {
      setEditingCategory(category);
  };

  const handleBackClick = () => {
      setEditingCategory(null);
  };

  if (editingCategory) {
      return (
          <CategoryEditView 
            category={editingCategory} 
            products={products.filter(p => p.categoryId === editingCategory.id)}
            onBack={handleBackClick}
          />
      );
  }

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Categorías</h2>
                <p className="text-slate-500">Gestiona las categorías de tus productos</p>
            </div>
            {/* Action buttons (fake) */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                    <div className="h-32 bg-slate-100 overflow-hidden relative">
                         <img 
                            src={`https://marmelab.com/posters/${category.name}-1.jpeg`}
                            alt={category.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x150?text=No+Image';
                            }}
                        />
                         <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 items-center">
                        <h3 className="text-lg font-bold text-slate-800 capitalize mb-4">{category.name}</h3>
                        
                        <div className="flex gap-4 w-full mt-auto">
                            <button 
                                onClick={() => onFilterProductsByCategory(category.id)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 text-indigo-600 hover:bg-indigo-50 rounded text-sm font-medium transition-colors"
                                title="Ver Productos"
                            >
                                <ImageIcon size={18} />
                                <span className="hidden sm:inline">Productos</span>
                            </button>
                            <button 
                                onClick={() => handleEditClick(category)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-600 hover:bg-slate-100 rounded text-sm font-medium transition-colors"
                                title="Editar"
                            >
                                <Edit size={18} />
                                <span className="hidden sm:inline">Editar</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

// Sub-component for the Edit View
const CategoryEditView: React.FC<{ category: Category; products: Product[]; onBack: () => void }> = ({ category, products, onBack }) => {
    return (
        <div className="animate-fade-in max-w-5xl mx-auto">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors"
            >
                <ArrowLeft size={20} />
                Volver a la lista
            </button>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="text-xl font-bold text-slate-800">Editar Categoría "{category.name}"</h3>
                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                        <Save size={18} /> Guardar
                    </button>
                </div>
                
                <div className="p-6 space-y-8">
                    {/* Simple Form */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                            <input 
                                type="text" 
                                defaultValue={category.name} 
                                className="w-full max-w-md px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* ReferenceManyField Simulation (Product Table) */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                             <h4 className="text-lg font-semibold text-slate-800">Productos Relacionados</h4>
                             {/* Fake Add Button */}
                        </div>
                       
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3 w-16">Img</th>
                                        <th className="px-4 py-3">Referencia</th>
                                        <th className="px-4 py-3 text-right">Precio</th>
                                        <th className="px-4 py-3 text-right">Stock</th>
                                        <th className="px-4 py-3 text-right">Ventas</th>
                                        <th className="px-4 py-3 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {products.map(product => (
                                        <tr key={product.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-2">
                                                <img src={product.image} alt="" className="w-8 h-8 rounded object-cover" />
                                            </td>
                                            <td className="px-4 py-2 font-medium text-slate-700">{product.reference}</td>
                                            <td className="px-4 py-2 text-right">${product.price.toFixed(2)}</td>
                                            <td className="px-4 py-2 text-right">{product.stock}</td>
                                            <td className="px-4 py-2 text-right">{product.sales}</td>
                                            <td className="px-4 py-2 text-right">
                                                <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Editar</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                                                No hay productos en esta categoría.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesView;