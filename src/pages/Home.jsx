import React from 'react'
import SearchBox from '../components/Home/SearchBox'
import Text from '../components/Home/Text'
import Coinbox from '../components/Home/Coinbox'
import PriceChart from '../components/coinGraph/PriceChart '
// import CoinGraph from '../components/coinGraph/CoinGraph'

const Home = () => {
  return (
    <>
    <Text />
    <SearchBox />
    <Coinbox/>
    <PriceChart />
    {/* <CoinGraph symbol="bitcoin"/> */}
    </>
  )
}

export default Home