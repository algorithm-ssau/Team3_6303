import React, { useState } from 'react';
import FilterPanel from '../components/FilterPanel';
import HeaderC from '../components/HeaderC';
import FooterC from '../components/FooterC';
import '../styles/MainPage.css';
import Catalog from '../components/Catalog';

const MainPage = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="main-container">
      <HeaderC />
      <FilterPanel onFilterChange={handleFilterChange} />
      <div className="page-content">
        {/* <div className="filter-container">
          <FilterPanel onFilterChange={handleFilterChange} />
        </div> */}
        <Catalog filters={filters} />
      </div>
      <FooterC />
    </div>
  );
};

export default MainPage;
