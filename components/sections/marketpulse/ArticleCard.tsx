import React, { useState } from 'react';
import { Article } from '../../../types';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <button
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-200 text-left w-full"
      onClick={onClick}
    >
      <div className="relative">
        {imgError ? (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100">
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e5e7eb" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#9ca3af">No Image</text></svg>
          </div>
        ) : (
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" onError={() => setImgError(true)} />
        )}
        <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
          {article.countryTag}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{article.title}</h3>
        <p className="text-sm text-gray-700 mb-2">{article.subtitle}</p>
        <p className="text-xs text-gray-600 mb-3 line-clamp-3 flex-grow">{article.description}</p>
        <p className="text-xs text-gray-500 mt-auto">{article.date}</p>
      </div>
    </button>
  );
};

export default ArticleCard;