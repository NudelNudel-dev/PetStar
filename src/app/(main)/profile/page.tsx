"use client";

import React, { useEffect, useState } from 'react';

interface ProfileData {
  pet_name: string;
  gender: 'male' | 'female';
  age: number;
  breed: string;
  profile_image?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 데이터 로딩 로직은 동일
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("프로필 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return <div className="p-10 text-center">로딩중...</div>;

  return (
    <div className="w-full min-h-screen bg-white pb-20">
      <div className="p-4">
        {/* 상단 계정 ID 및 설정 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1 cursor-pointer">
            <h1 className="text-xl font-black">jinse_seo</h1>
            <span className="text-gray-400 text-sm">▼</span>
          </div>
          <button className="text-xl">⚙️</button>
        </div>

        {/* 통계 (게시물, 팔로워, 팔로잉) */}
        <div className="flex justify-between px-4 mb-6">
          <div className="text-center"><p className="font-black text-lg">89</p><p className="text-xs text-gray-500">게시물</p></div>
          <div className="text-center"><p className="font-black text-lg">478</p><p className="text-xs text-gray-500">팔로워</p></div>
          <div className="text-center"><p className="font-black text-lg">582</p><p className="text-xs text-gray-500">팔로잉</p></div>
        </div>

        {/* 프로필 이미지 및 반려동물 정보 */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full mb-2"></div>
          <p className="font-black text-lg">
            {profile?.pet_name} {profile?.gender === 'male' ? '♂' : '♀'} {profile?.age}살
          </p>
          <p className="text-sm text-gray-500">{profile?.breed}</p>
        </div>

        {/* 탭 영역 (기획안의 아이콘 3개) */}
        <div className="flex justify-around border-y border-gray-100 py-2 mb-2">
          <span>🖼️</span><span>📑</span><span>🏆</span>
        </div>

        {/* 사진 그리드 (3x3) */}
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center text-xs text-gray-400">
              Image {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}