import fs, { unlink } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/posts');

// 获取所有文章
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  // 目录下所有md文件构成的文件名数组 [ 'xxx.md', 'xxxxx.md' ]
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    // 读取文章中的raw txt
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      ...data,
      content,
    };
  });
}

// 删除slug为名字的文章
export function deletePost(slug) {
  const fileNames = fs.readdirSync(postsDirectory);
  // 目录下所有md文件构成的文件名数组 [ 'xxx.md', 'xxxxx.md' ]
  const target = fileNames.find((fileName) => {
    const _slug = fileName.replace(/\.md$/, '');
    return _slug == slug;
  })
  
  if (target) {
    const filePath = path.join(postsDirectory, target);
    fs.unlinkSync(filePath);
  } else {
    return false;
  }
}

// 添加新的文章
export function addPost(title) {
  const fileName = path.join(postsDirectory, title+'.md');
  fs.writeFileSync(fileName, "")
  return fileName;
}

// 更新slug文章
export async function updatePost(slug, newData, title) {
  const newFileName = title || slug;
  const oldFileName = path.join(postsDirectory, slug+'.md');
  const fileName = path.join(postsDirectory, newFileName+'.md');
  if (title) {
    // 如果有title字段表示修改文章名
    fs.unlinkSync(oldFileName)
  }
  fs.writeFileSync(fileName, newData)
  return fileName;
}
