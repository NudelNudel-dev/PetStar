import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// 1. 프로필 정보 불러오기 (GET)
export async function GET() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// 2. 프로필 정보 저장하기 (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { petName, gender, age, breed, profileImage } = body;

    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          pet_name: petName,
          gender: gender,
          age: parseInt(age),
          breed: breed,
          profile_image: profileImage,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: '서버 에러' }, { status: 500 });
  }
}