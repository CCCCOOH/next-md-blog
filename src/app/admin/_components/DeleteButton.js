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

function DeleteButton({post}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          删除
        </Button>
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
          fetch('/api/article/'+post.slug, {
            method: 'delete'
          })
        }} type="submit" >确定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteButton