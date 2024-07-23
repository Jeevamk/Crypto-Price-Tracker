import React from 'react'

function SingleCoinBox({coin}) {
    console.log(coin);
  return (
    <>
    <div className="flex items-center text-white">
      <img
        src={coin.image}
        alt="Logo"
        className="w-12 h-12 object-contain rounded-3xl"
      />
      <div className="ml-5">
        <div className="text-xl font-semibold">{coin.coinName}</div>
        <div className="text-sm">{coin.symbol}</div>
      </div>
      
    </div>
    
    <div className='text-white m-4 font-bold'>
        Usdt : <span className='text-green-400 m-4 font-bold'>{coin.usdtPrice}</span>
    </div>
    <div className="border flex justify-center border-blue-400 text-white p-3 rounded-3xl"><span>Explore</span></div>
    </>
    
  )
}

export default SingleCoinBox