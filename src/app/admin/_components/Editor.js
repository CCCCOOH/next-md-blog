'use client'
import React, { useEffect, useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';

const Editor = ({value, initValue, post}) => {
  const [flag, setFlag] = useState(false);  // flag表示是否已经初始化数据
  const [content, setContent] = useState('');
  useEffect(() => {
    if (!flag) {  // 如果没有初始化过就初始化一次，并设置flag为结束true
      setContent(initValue);
      setFlag(true);
    }
  }, [initValue])
  return (
    <MarkdownEditor
      value={content}
      onChange={(value, viewUpdate) => {
        fetch('/api/article/'+post.uuid, {
          method: 'PUT',
          body: JSON.stringify({
            content: content
          })
        })
        setContent(value);
      }}
    />
  )
};

export default Editor;