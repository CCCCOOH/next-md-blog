import { addPost } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {slug} = await req.json();
    if (slug.trim() === '') {
      return NextResponse.json({
        success: false,
        msg: '添加失败,不能为空'
      })
    }
    const res = addPost(slug);
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