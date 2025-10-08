import fs, { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { randomUUID } from 'crypto';

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
  // getAllPosts => [{slug, ...frontmatters, content}, {}]
}

export function findPost(uuid) {
  const fileNames = fs.readdirSync(postsDirectory);
  const targetFileName = fileNames.find((fileName) => {
    // 遍历所有文章寻找文章内容中是否有 frontmatter.uuid 
    const filePath = path.join(postsDirectory, fileName);
    const file = fs.readFileSync(filePath, 'utf8');
    const {data, content} = matter(file);
    if (data.uuid) {
      return true;
    } else {
      return false;
    }
  })
  if (targetFileName) {
    const targetFilePath = path.join(postsDirectory, targetFileName);
    return {targetFileName, targetFilePath};
  } else {
    return false;
  }
}
// findPost => {targetFileName, targetFilePath}

// 删除uuid对应的文章
export function deletePost(uuid) {
  // 目录下所有md文件构成的文件名数组 [ 'xxx.md', 'xxxxx.md' ]
  // target为是否找到了uuid对应的文件的一个布尔值
  const {targetFilePath} = findPost(uuid);
  
  if (targetFilePath) {
    fs.unlinkSync(targetFilePath);
  } else {
    return false;
  }
}

// 添加新的文章
export function addPost(title) {
  const fileName = path.join(postsDirectory, title+'.md');
  const tem_matter_obj = matter("");  // 将""转为一个matter对象
  tem_matter_obj.data.uuid = randomUUID();
  tem_matter_obj.data.title = title;
  
  const st = matter.stringify(tem_matter_obj.content, tem_matter_obj.data);
  
  fs.writeFileSync(fileName, st)
  return fileName;
}

// 更新uuid对应的文章
export async function updatePost(uuid, data) {
  const {title, content} = data;
  
  // title, newContent is from POST body.
  const {targetFilePath} = findPost(uuid);
  if (!targetFilePath) return false;
  if (title) {
    const file = fs.readFileSync(targetFilePath);
    const {data: frontmatter, content} = matter(file);
    frontmatter.title = title;
    const st = matter.stringify(content, frontmatter);
    writeFileSync(targetFilePath, st);
  }
  if (content) {
    const file = fs.readFileSync(targetFilePath);
    const {data: frontmatter} = matter(file); // the content from the file
    const st = matter.stringify(content, frontmatter);
    writeFileSync(targetFilePath, st);
  }
}