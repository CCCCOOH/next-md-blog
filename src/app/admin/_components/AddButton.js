'use client'
import { Button } from '@/components/ui/button'

function AddButton() {
  return (
    <Button size="sm" onClick={
      () => {
        // 按下添加按钮后执行
      }
    } >添加</Button>
  )
}

export default AddButton