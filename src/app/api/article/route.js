import { addPost } from "@/lib/posts";
import { NextResponse } from "next/server";

// 添加文章API
export async function POST(req) {
  try {
    const {title} = await req.json();
    if (title.trim() === '') {
      return NextResponse.json({
        success: false,
        msg: '添加失败,不能为空'
      })
    }
    const res = addPost(title);
    if (res) {
      // res为文件操作API返回的添加结果
      return NextResponse.json({
        success: true,
        msg: '文章添加成功',
      })
    } else {
      return NextResponse.json({
        success: false,
        msg: '添加失败'
      })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: '添加失败'
    })
  }
}