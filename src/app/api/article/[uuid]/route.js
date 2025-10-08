import { deletePost, getAllPosts, updatePost } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function DELETE(req, {params}) {
  const {uuid} = await params;
  deletePost(uuid);
  try {
    return NextResponse.json({
      success: true,
      msg: '删除成功',
      data: getAllPosts()
    })  
  } catch(e) {
    return NextResponse.json({
      success: false,
      msg: '删除失败',
    })  
  }
}

export async function PUT(req, {params}) {
  try {
    const {uuid} = await params;
    const data = await req.json();
    // data 修改文章内容
    // title 修改文件名
    updatePost(uuid, data);
    return NextResponse.json({
      success: true,
      msg: '更新成功',
      data: getAllPosts()
    })  
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: '更新失败',
    })  
  }
}