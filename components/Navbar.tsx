import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
        <nav>
            <ul className="flex space-x-4">

                <li>
                    <Link href="/" className="text-blue-500 hover:underline">Home</Link>
                </li>
                <li>
                    <Link href="/about" className="text-blue-500 hover:underline">About</Link>
                </li>
            </ul>
        </nav>
  )
}

export default Navbar