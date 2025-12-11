import React, { useState } from 'react';
import { Review } from '../../types/types';
import { Star, MessageSquare, Check, X, Filter } from 'lucide-react';

interface ReviewsViewProps {
  reviews: Review[];
}

const ReviewsView: React.FC<ReviewsViewProps> = ({ reviews }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const filteredReviews = reviews.filter(r => filter === 'all' || r.status === filter);

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-800">Reseñas de Productos</h2>
            
            <div className="flex p-1 bg-white border border-slate-200 rounded-lg shadow-sm">
                {(['all', 'pending', 'accepted', 'rejected'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                            filter === status 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        {status === 'all' ? 'Todas' : 
                         status === 'pending' ? 'Pendientes' : 
                         status === 'accepted' ? 'Aprobadas' : 'Rechazadas'}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid gap-4">
            {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6">
                    {/* Customer Info Column */}
                    <div className="sm:w-48 flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-3 sm:border-r border-slate-100 sm:pr-6">
                        <img src={review.customer.avatar} alt={review.customer.name} className="w-12 h-12 rounded-full" />
                        <div>
                            <p className="font-semibold text-slate-800 text-sm">{review.customer.name}</p>
                            <p className="text-xs text-slate-500">{review.date}</p>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium text-indigo-600 text-sm mb-1">{review.productName}</h4>
                                <div className="flex items-center mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            size={16} 
                                            className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"} 
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
                                ${review.status === 'accepted' ? 'bg-green-100 text-green-700' : 
                                  review.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                                  'bg-yellow-100 text-yellow-700'}`}>
                                {review.status}
                            </div>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed mb-4 bg-slate-50 p-3 rounded border border-slate-100">
                            "{review.comment}"
                        </p>

                        {review.status === 'pending' && (
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded border border-green-200 text-sm font-medium hover:bg-green-100 transition-colors">
                                    <Check size={16} /> Aprobar
                                </button>
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded border border-red-200 text-sm font-medium hover:bg-red-100 transition-colors">
                                    <X size={16} /> Rechazar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {filteredReviews.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
                    <MessageSquare className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                    <p className="text-slate-500">No hay reseñas en esta categoría.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default ReviewsView;