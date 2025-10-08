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
    if (data.uuid === uuid) {
      return true;
    } else {
      return false;
    }
  })
  if (targetFileName) {
    const targetFilePath = path.join(postsDirectory, targetFileName);
    const targetFile = readFileSync(targetFilePath, 'utf8');
    return {targetFileName, targetFilePath, targetFile};
  } else {
    return false;
  }
}
// findPost => {targetFileName, targetFilePath, targetFile}

// 删除uuid对应的文章
export function deletePost(uuid) {
  // 目录下所有md文件构成的文件名数组 [ 'xxx.md', 'xxxxx.md' ]
  // target为是否找到了uuid对应的文件的一个布尔值
  const {targetFilePath} = findPost(uuid);
  
  if (targetFilePath) {
    fs.rmSync(targetFilePath);
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
  tem_matter_obj.data.createdTime = new Date();
  tem_matter_obj.data.updatedTime = new Date();

  
  const st = matter.stringify(tem_matter_obj.content, tem_matter_obj.data);
  
  fs.writeFileSync(fileName, st)
  return fileName;
}

// 更新uuid对应的文章
export async function updatePost(uuid, data) {
  const {title, content} = data;
  
  // title, newContent is from POST body.
  const {targetFilePath, targetFile} = findPost(uuid);
  const {data: targetFileData, content: targetFileContent} = matter(targetFile);
  
  if (!targetFilePath) return false; // if can not find this file, exit.

  if (title) {
    targetFileData.title = title;
    updateFileData(uuid, targetFileData);
  }
  if (content) {
    updateFileContent(uuid, content);
  }
}

function updateFileData(uuid, data) {
  const {targetFilePath} = findPost(uuid);  // find the file
  const file = fs.readFileSync(targetFilePath);
  const {content} = matter(file); // stay content and update frontmatter
  const st = matter.stringify(content, data);
  writeFileSync(targetFilePath, st);
}

function updateFileContent(uuid, newContent) {
  const {targetFilePath} = findPost(uuid);
  const file = fs.readFileSync(targetFilePath);
  const {data} = matter(file); // get the content from the file
  const st = matter.stringify(newContent, data); // 保持frontmatter不变，修改newContent
  writeFileSync(targetFilePath, st); // write back file
}