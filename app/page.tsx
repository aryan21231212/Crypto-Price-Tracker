import CoinTable from '@/components/CoinTable'
import Navbar from '@/components/Navbar'

import CoinCard from '@/components/CoinCard'
import React from 'react'

const page = () => {
  return (
    <div className="container">
      <Navbar />



      <div className="block md:hidden">
        <CoinCard />
      </div>


      <div className="hidden md:block">
        <CoinTable />
      </div>
    </div>
  )
}

export default page
