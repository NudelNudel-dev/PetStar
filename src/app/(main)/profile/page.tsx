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

  if (loading) return <div className="p-10 text-center text-sm text-gray-400">로딩중...</div>;

  return (
    <div className="w-full min-h-screen bg-white pb-20">
      <div className="p-4">
        {/* 1. 상단 계정 ID 및 설정 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1 cursor-pointer hover:opacity-70">
            <h1 className="text-xl font-black text-gray-950">jinse_seo</h1>
            <span className="text-gray-400 text-sm">▼</span>
          </div>
          <button className="text-xl">⚙️</button>
        </div>

        {/* 2. 프로필 이미지 및 반려동물 정보 (통계 제거 후 중앙 배치) */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 shadow-inner flex items-center justify-center text-3xl">
            🐶
          </div>
          <p className="font-black text-xl text-gray-950">
            {profile?.pet_name} {profile?.gender === 'male' ? '♂' : '♀'} {profile?.age}살
          </p>
          <p className="text-sm font-medium text-gray-500 mt-1">{profile?.breed}</p>
        </div>

        {/* 3. 탭 영역 */}
        <div className="flex justify-around border-y border-gray-100 py-3 mb-2">
          <span className="opacity-100">🖼️</span>
          <span className="opacity-40">📑</span>
          <span className="opacity-40">🏆</span>
        </div>

        {/* 4. 사진 그리드 */}
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center text-xs text-gray-400 border border-white">
              Image {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}