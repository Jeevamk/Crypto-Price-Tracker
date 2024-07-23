// import React, { useEffect, useState } from 'react';
// import { coins } from '../../constants/coins';
// import { DUMMY_IMAGE_URL } from '../../constants/dummyImages';
// import CoinCard from './CoinCard';

// function Coinbox() {
//   const [cryptoImagesList, setCryptoImagesList] = useState([]);
//   const [coinsWithImagesAndPrices, setCoinsWithImagesAndPrices] = useState([]);

//   useEffect(() => {
//     const fetchCryptoData = async () => {
//       try {
//         const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
//         const data = await response.json();

//         const formattedCryptoImagesList = data.map(coin => ({
//           coinName: coin.name,
//           symbol: coin.symbol,
//           image: coin.image
//         }));

//         setCryptoImagesList(formattedCryptoImagesList);
//       } catch (error) {
//         console.error('Error fetching cryptocurrency data:', error);
//       }
//     };

//     fetchCryptoData();
//   }, []);

//   useEffect(() => {
//     const fetchUSDTData = async () => {
//       try {
//         const response = await fetch('https://x.wazirx.com/wazirx-falcon/api/v2.0/crypto_rates'); 
//         const data = await response.json();

//         const coinsWithRealOrDummyImageAndPrice = coins.map(coinSymbol => {
//           const cryptoData = cryptoImagesList.find(crypto => crypto.symbol === coinSymbol);
//           const usdtPrice = data[coinSymbol]?.usdt || '0.00';

//           return {
//             coinName: cryptoData ? cryptoData.coinName : coinSymbol,
//             symbol: coinSymbol,
//             image: cryptoData ? cryptoData.image : DUMMY_IMAGE_URL,
//             usdtPrice
//           };
//         });

//         setCoinsWithImagesAndPrices(coinsWithRealOrDummyImageAndPrice);
//       } catch (error) {
//         console.error('Error fetching USDT data:', error);
//       }
//     };

//     if (cryptoImagesList.length > 0) {
//       fetchUSDTData();
//     }
//   }, [cryptoImagesList]);

//   return (
//     <div className='flex flex-wrap justify-center gap-3'>
//       {coinsWithImagesAndPrices.map(coin => (
//         <CoinCard key={coin.symbol} coin={coin} />
//       ))}
//     </div>
//   );
// }


// export default Coinbox;


import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { coins } from '../../constants/coins';
import { DUMMY_IMAGE_URL } from '../../constants/dummyImages';
import CoinCard from './CoinCard';

const ITEMS_PER_PAGE = 15;

function Coinbox() {
  const [cryptoImagesList, setCryptoImagesList] = useState([]);
  const [coinsWithImagesAndPrices, setCoinsWithImagesAndPrices] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        const data = await response.json();

        const formattedCryptoImagesList = data.map(coin => ({
          coinName: coin.name,
          symbol: coin.symbol,
          image: coin.image
        }));

        setCryptoImagesList(formattedCryptoImagesList);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  useEffect(() => {
    const fetchUSDTData = async () => {
      try {
        const response = await fetch('https://x.wazirx.com/wazirx-falcon/api/v2.0/crypto_rates'); 
        const data = await response.json();

        const coinsWithRealOrDummyImageAndPrice = coins.map(coinSymbol => {
          const cryptoData = cryptoImagesList.find(crypto => crypto.symbol === coinSymbol);
          const usdtPrice = data[coinSymbol]?.usdt || '0.00';

          return {
            coinName: cryptoData ? cryptoData.coinName : coinSymbol,
            symbol: coinSymbol,
            image: cryptoData ? cryptoData.image : DUMMY_IMAGE_URL,
            usdtPrice
          };
        });

        setCoinsWithImagesAndPrices(coinsWithRealOrDummyImageAndPrice);
      } catch (error) {
        console.error('Error fetching USDT data:', error);
      }
    };

    if (cryptoImagesList.length > 0) {
      fetchUSDTData();
    }
  }, [cryptoImagesList]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const indexOfLastItem = (currentPage + 1) * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = coinsWithImagesAndPrices.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className='flex flex-wrap justify-center gap-3 mt-14'>
        {currentItems.map(coin => (
          <CoinCard key={coin.symbol} coin={coin} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(coinsWithImagesAndPrices.length / ITEMS_PER_PAGE)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          previousClassName={'previous'}
          nextClassName={'next'}
          breakClassName={'break'}
          disabledClassName={'disabled'}
          pageClassName={'page'}
        />
      </div>
    </div>
  );
}

export default Coinbox;

