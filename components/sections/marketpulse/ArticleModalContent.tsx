import React, { useState } from 'react';
import { Article } from '../../../types';
import { ExternalLinkIcon } from '../../IconComponents';

interface ArticleModalContentProps {
  article: Article;
}

const ArticleModalContent: React.FC<ArticleModalContentProps> = ({ article }) => {
  const isRedGold = article.id === 'red-gold-of-the-andes';
  const [imgError, setImgError] = useState(false);
  return (
    <div className="text-gray-700">
      <div className="relative mb-4">
        {imgError ? (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-md">
            <svg width="96" height="96" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e5e7eb" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#9ca3af">No Image</text></svg>
          </div>
        ) : (
          <img src={article.image} alt={article.title} className="w-full h-full object-cover rounded-md" onError={() => setImgError(true)} />
        )}
        <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
          {article.countryTag}
        </span>
      </div>
      {isRedGold && (
        null
      )}
      {!isRedGold && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h2>
          <h3 className="text-lg text-gray-700 mb-2">{article.subtitle}</h3>
          <p className="text-sm text-gray-500 mb-4">{article.date}</p>
        </>
      )}
      <div className="prose prose-sm max-w-none whitespace-pre-line text-gray-700">
        {article.fullContent}
      </div>
    </div>
  );
};

export default ArticleModalContent;