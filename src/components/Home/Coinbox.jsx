import React, { useState, useEffect } from 'react';
import SearchBox from './Search/SearchBox';
import CoinCard from './CoinCard';
import Pagination from './Pagination';
import Shimmer from './Shimmer';
import NotFound from './NotFound';

const ITEMS_PER_PAGE = 15;

function Coinbox() {
  const [coinsWithImagesAndPrices, setCoinsWithImagesAndPrices] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState(null);


  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/coins/getCoin');
        const data = await response.json();
        setCoinsWithImagesAndPrices(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  useEffect(() => {
    if (selectedSymbol) {
      console.log('Selected Symbol:', selectedSymbol);
    }
  }, [selectedSymbol]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const indexOfLastItem = (currentPage + 1) * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = coinsWithImagesAndPrices.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <SearchBox coinsWithImagesAndPrices={coinsWithImagesAndPrices} setCoinsWithImagesAndPrices={setCoinsWithImagesAndPrices}/>
      <div className='flex flex-wrap justify-center gap-3 mt-9'>
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <Shimmer key={index} />
            ))
          : currentItems.length == 0 ? <NotFound /> :currentItems.map(coin => (
              <CoinCard key={coin.symbol} coin={coin} />
            ))}
      </div>
      {!isLoading && coinsWithImagesAndPrices.length > ITEMS_PER_PAGE && (
        <Pagination
          pageCount={Math.ceil(coinsWithImagesAndPrices.length / ITEMS_PER_PAGE)}
          onPageChange={handlePageClick}
        />
      )}
    </div>
  );
}

export default Coinbox;