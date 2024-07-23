import React from 'react';
import SingleCoinBox from './SingleCoinBox';

// eslint-disable-next-line react/prop-types
const CoinCard = ({ coin }) => {
  return (
    <div className="bg-black rounded-md p-7 w-[244px] h-[224px]">
      <SingleCoinBox coin={coin} />
    </div>
  );
};

export default CoinCard;