import MarkdownIt from 'markdown-it';
import { getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import "./github.css";

// 创建一个md渲染对象
const md = new MarkdownIt();

export async function generateStaticParams() {
  const posts = getAllPosts();
// 获取所有posts
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 根据slug筛选出特定的文章
async function fetchPost(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export default async function Post({ params }) {
  const post = await fetchPost(params.slug); // 找到特定的文章

  if (!post) {
    notFound(); // 如果找不到文章就返回NotFound
  }

  const htmlContent = md.render(post.content);  // 将markdown文本转为浏览器识别的html

  return (
    <article>
      <h1>{post.title}</h1>
      <p className="post-meta">{post.date}</p>
      <div className='bg-white p-10'>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </article>
  );
}