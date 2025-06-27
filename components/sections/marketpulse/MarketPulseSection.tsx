import React, { useState } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import ArticleCard from './ArticleCard';
import Modal from '../../ui/Modal';
import ArticleModalContent from './ArticleModalContent';
import Dropdown from '../../ui/Dropdown';
import { ARTICLES_DATA, ALL_COUNTRIES_OPTIONS } from '../../../constants';
import { Article } from '../../../types';

const MarketPulseSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [countryFilter, setCountryFilter] = useState<string>(ALL_COUNTRIES_OPTIONS[0].value);

  const filteredArticles = ARTICLES_DATA.filter(article => 
    countryFilter === 'all' || article.countryTag.toLowerCase() === countryFilter.toLowerCase()
  );

  const countryFilterDropdown = (
    <Dropdown
      options={ALL_COUNTRIES_OPTIONS}
      selectedValue={countryFilter}
      onSelect={(value) => setCountryFilter(value as string)}
      className="w-full md:w-auto"
      buttonClassName="w-full md:w-auto py-1 px-2 text-sm"
    />
  );

  return (
    <SectionWrapper
      id="market-pulse"
      title="Market Pulse"
      tooltipText="Latest news and analysis on the pomegranate market."
      headerContent={countryFilterDropdown}
      inlineHeaderContentMobile={false}
    >
      {/* Desktop: Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} onClick={() => setSelectedArticle(article)} />
        ))}
      </div>
      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
          {filteredArticles.map((article) => (
            <div key={article.id} className="w-72 flex-shrink-0">
              <ArticleCard article={article} onClick={() => setSelectedArticle(article)} />
            </div>
          ))}
        </div>
      </div>

      {filteredArticles.length === 0 && (
        <p className="text-center text-gray-600 py-8">No articles found for the selected filter.</p>
      )}

      {selectedArticle && (
        <Modal isOpen={!!selectedArticle} onClose={() => setSelectedArticle(null)} title={selectedArticle.title}>
          <ArticleModalContent article={selectedArticle} />
        </Modal>
      )}
    </SectionWrapper>
  );
};

export default MarketPulseSection;
