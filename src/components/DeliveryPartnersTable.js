
import React, { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'

const DeliveryPartnersTable = () => {
  const orders = [
    { id: 1, customer: 'John Doe', amount: 1000, status: 'Pending' },
    { id: 2, customer: 'Jane Smith', amount: 1500, status: 'Shipped' }
  ]
  // Status badge component
  // const StatusBadge = ({ status }) => {
  //   const statusConfig = {
  //     Active: {
  //       bg: 'bg-green-100',
  //       text: 'text-green-800',
  //       icon: <CheckCircle size={14} className='mr-1' />
  //     },
  //     Inactive: {
  //       bg: 'bg-yellow-100',
  //       text: 'text-yellow-800',
  //       icon: <Clock size={14} className='mr-1' />
  //     },
  //     Blocked: {
  //       bg: 'bg-red-100',
  //       text: 'text-red-800',
  //       icon: <XCircle size={14} className='mr-1' />
  //     }
  //   }

  //   const config = statusConfig[status]

  //   return (
  //     <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}>{config.icon} {status}</span>
  //   )
  // }
  return (
    <div className='bg-white rounded-lg shadow'>
      {/* Header section */}
      <div className='p-6 border-b border-gray-200'>
        <h1 className='text-xl font-semibold text-gray-800'>Orders</h1>
      </div>
      {/* Table section */}
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                S No
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Contact
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Location
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {orders.map((order) => (
               <tr key={order.id} className='hover:bg-gray-50'>
                 <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                   {order.id}
                 </td>
                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                   {order.customer}
                 </td>
                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                   {order.contact}
                 </td>
                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                   ₹
                   {order.amount}
                 </td>
                 <td className='px-6 py-4 whitespace-nowrap text-sm'>
                   {order.status}
                 </td>
                 <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                   <button className='text-blue-500 hover:text-blue-700 mr-2'>
                     <MdEdit />
                   </button>
                   <button className='text-red-500 hover:text-red-700'>
                     <MdDelete />
                   </button>
                 </td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default DeliveryPartnersTable
