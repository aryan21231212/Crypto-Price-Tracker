import Navbar from '@/components/Navbar'
import SearchBar from '@/components/SearchBar'
import React from 'react'

const page = () => {
  return (
    <>
      <div className="container">
        <Navbar />

        <SearchBar />
      </div>
    </>
  )
}

export default page