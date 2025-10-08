import MarkdownIt from 'markdown-it';
import { getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import EditArticleContainer from '../../_components/EditArticleContainer';

// 创建一个md渲染对象
const md = new MarkdownIt();

// export async function generateStaticParams() {
//   const posts = getAllPosts();
// // 获取所有posts
//   return posts.map((post) => ({
//     uuid: post.uuid,
//   }));
// }

// 根据slug筛选出特定的文章
async function fetchPost(uuid) {
  const posts = getAllPosts();
  return posts.find((post) => post.uuid === uuid);
}

export default async function Post({ params }) {
  const {uuid} = await params;
  const post = await fetchPost(uuid); // 找到特定的文章
  
  if (!post) {
    notFound(); // 如果找不到文章就返回NotFound
  }

  // const htmlContent = md.render(post.content);  // 将markdown文本转为浏览器识别的html

  return (
    <EditArticleContainer post={post} />
  );
}