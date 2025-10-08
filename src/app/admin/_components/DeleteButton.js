'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { toast } from 'sonner'

function DeleteButton({post}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>删除</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>确定删除吗?</DialogTitle>
          <DialogDescription>
            请谨慎操作哦...
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={() => {
            setOpen(false);
            fetch('/api/article/'+post.uuid, {
              method: 'delete'
            }).then(res => {
              toast('删除成功, 不能后悔了哦～')
            })
          }} type="submit" >确定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteButton