// app/page.js
import Card from '@/components/Card';
import Title from '@/components/Title';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <div>
      <Title>Blog Posts</Title>
      <ul>
        {posts.map((post) => (
          <li key={post.uuid} className='m-2'>
            <Card>
              <Link href={`/posts/${post.uuid}`}>
                <span className='hover:text-slate-500'>{post.title}</span>
              </Link>
              <p>{post.date}</p>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}