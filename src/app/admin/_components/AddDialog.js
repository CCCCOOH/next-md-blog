'use client'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function AddDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (open === false) {
      // 关闭时重置showAlert
      setShowAlert(false);
    }
  }, [open])
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button variant="outline" >添加</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>添加文章</DialogTitle>
          <DialogDescription>
            请输入文章标题
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              value={title}
              id="link"
              defaultValue=""
              onChange={
                (e) => {
                  setTitle(e.target.value);
                }
              }
            />
          </div>
        </div>
        {showAlert && <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>添加失败</AlertTitle>
          <AlertDescription>
            <p>标题不能为空</p>
          </AlertDescription>
        </Alert>}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={
            () => {
              // 调用添加文章API
              if (title.trim() === '') {
                setShowAlert(true)
                return;
              }
              fetch('/api/article', {
                method: "POST",
                body: JSON.stringify({
                  slug: title
                })
              })
              setOpen(false);
            }
          } type="submit">提交</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddDialog