import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, ShoppingCart, Package, Users, Menu, X} from 'lucide-react'

import { FaTruck, FaList, FaTags, FaTicketAlt, FaImage} from 'react-icons/fa'

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={`bg-indigo-800 text-white ${
        isSidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 flex-shrink-0 md:block`}>
      <div className='p-4 flex items-center justify-between'>
        {isSidebarOpen && <h1 className='text-xl font-bold'>FreshMoo</h1>}
        <button onClick={toggleSidebar} className='p-1 rounded-md hover:bg-indigo-700'>
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <ul>
        <li className='mb-4'>
          <Link to='/dashboard' className='px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors'>
          <BarChart className='mr-2' />
          {isSidebarOpen && <span className='ml-4'>Dashboard</span>}
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='/dashboard/orders' className='px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors'>
          <ShoppingCart className='mr-2' />
          {isSidebarOpen && <span className='ml-4'>Orders</span>}
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='/dashboard/users' className='px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors'>
          <Users className='mr-2' size={20} />
          {isSidebarOpen && <span className='ml-4'>Users</span>}
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='/dashboard/delivery-partners' className='px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors'>
          <FaTruck className='mr-2' />
          {isSidebarOpen && <span className='ml-4'>Delivery Partners</span>}
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='/dashboard/products' className='px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors'>
          <Package className='mr-2' />
          {isSidebarOpen && <span className='ml-4'>Products</span>}
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='/dashboard/categories' className='px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors'>
          <FaList className='mr-2' />
          {isSidebarOpen && <span className='ml-4'>Categories</span>}
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='/dashboard/offers' className='px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors'>
          <FaTags className='mr-2' />
          {isSidebarOpen && <span className='ml-4'>Offers</span>}
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='/dashboard/coupons' className='px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors'>
          <FaTicketAlt className='mr-2' />
          {isSidebarOpen && <span className='ml-4'>Coupons</span>}
          </Link>
        </li>
        <li className='mb-4'>
          <Link to='/dashboard/banners' className='px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors'>
          <FaImage className='mr-2' />
          {isSidebarOpen && <span className='ml-4'>Banners</span>}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
