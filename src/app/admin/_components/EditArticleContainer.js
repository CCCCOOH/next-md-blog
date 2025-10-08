'use client'
import React, { useEffect, useState } from 'react'
import Editor from './Editor'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function EditArticleContainer({post}) {
  const [titleInput, setTitleInput] = useState("");
  useEffect(() => {
    setTitleInput(post.title)
  }, [])
  return (
    <article className='pt-10'>
      <div className='flex gap-2'>
        <Input value={titleInput} onChange={(e) => {
          setTitleInput(e.target.value);
        }} type="text" placeholder="文章标题" className="mb-5" />
        <Button onClick={
          () => {
            fetch('/api/article/'+post.uuid, {
              method: 'PUT',
              body: JSON.stringify(
                {
                  title: titleInput
                }
              )
            }).then(res => {
              toast("标题修改成功!")
            })
          }
        }>修改</Button>
      </div>
      <p className="post-meta">{post.date}</p>
      <div className='bg-white'>
        <Editor post={post} initValue={post.content} />
        {/* <div className="markdown-body" dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
      </div>
    </article>
  )
}

export default EditArticleContainer