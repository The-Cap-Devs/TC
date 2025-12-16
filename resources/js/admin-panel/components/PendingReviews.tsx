import React from 'react';
import { Review } from '../types';
import { MessageSquare, Star, Check, X } from 'lucide-react';

interface PendingReviewsProps {
  reviews: Review[];
}

const PendingReviews: React.FC<PendingReviewsProps> = ({ reviews }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col h-full">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <MessageSquare size={20} className="text-slate-400" />
          Reseñas Pendientes
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-0">
        <ul className="divide-y divide-slate-100">
          {reviews.map((review) => (
            <li key={review.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-4">
                <img 
                  src={review.customer.avatar} 
                  alt={review.customer.name} 
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-semibold text-slate-900">{review.customer.name}</p>
                    <span className="text-xs text-slate-400">{review.date}</span>
                  </div>
                  <p className="text-xs text-indigo-600 mb-2 truncate">Sobre: {review.productName}</p>
                  
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">"{review.comment}"</p>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors">
                      <Check size={14} /> Aprobar
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors">
                      <X size={14} /> Rechazar
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-lg">
        <button className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
          Ver todas las reseñas
        </button>
      </div>
    </div>
  );
};

export default PendingReviews;