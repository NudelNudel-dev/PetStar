import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// CBT용 임시 저장소 (메모리에 글을 보관)
export const globalPosts: any[] = [];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const caption = formData.get('caption') as string || '';

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const uniqueFileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${uniqueFileName}`;

    const newPost = {
      id: Date.now().toString(),
      imageUrl: imageUrl,
      caption: caption,
      createdAt: new Date().toISOString(),
    };

    globalPosts.unshift(newPost); 

    console.log('✅ 서버에 새 게시물 저장 완료:', newPost);
    return NextResponse.json({ success: true, post: newPost });

  } catch (error) {
    console.error('서버 에러:', error);
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
// src/app/api/upload/route.ts 맨 아래에 추가

export async function GET() {
  try {
    // 저장된 모든 게시물 목록을 응답으로 보냄
    return NextResponse.json({ success: true, posts: globalPosts });
  } catch (error) {
    console.error('피드 로딩 에러:', error);
    return NextResponse.json({ error: '데이터를 가져오지 못했습니다.' }, { status: 500 });
  }
}