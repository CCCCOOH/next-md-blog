import Link from 'next/link'
import React from 'react'

function Navigation() {
  return (
    <main className='w-full flex justify-between bg-slate-700 p-3 text-white'>
      <Link href="/">
        <span className='p-2'>Sy'Note&Blog</span>
      </Link>
      <Link href="/admin">
        <span className='p-2'>Admin</span>
      </Link>
    </main>
  )
}

export default Navigation