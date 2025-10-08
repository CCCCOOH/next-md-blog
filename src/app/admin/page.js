import Card from '@/components/Card'
import Title from '@/components/Title'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link';
import React from 'react'
import DeleteButton from './_components/DeleteButton';
import AddDialog from './_components/AddDialog';

function AdminHome() {
  const posts = getAllPosts();
  return (
    <main>
      <Title>
        <span className='mr-4'>AdminHome</span>
        <AddDialog />
      </Title>
      
      <Card>
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className='m-2 flex justify-between'>
              <Link href={`/admin/edit/${post.slug}`}>
                <span className='hover:text-slate-500'>{post.slug}</span>
              </Link>
              <DeleteButton post={post} />
            </li>
          ))}
        </ul>
      </Card>
    </main>
  )
}

export default AdminHome