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

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-gray-400 animate-pulse">정보를 가져오는 중...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white pb-20">
      <div className="p-4">
        {/* 1. 프로필 페이지 전용: 계정 선택 및 관리 UI */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
            <h1 className="text-xl font-black text-gray-950">
              {profile ? profile.pet_name : "로그인 정보 없음"}
            </h1>
            <span className="text-gray-400 text-sm">▼</span>
          </div>
          <button className="text-xl">⚙️</button>
        </div>

        {/* 2. 게시물/팔로워/팔로잉 통계 영역 */}
        <div className="grid grid-cols-3 gap-2 text-center py-2 bg-gray-50 rounded-xl mb-6">
          <div><p className="text-sm font-bold text-gray-900">0</p><p className="text-[10px] text-gray-400 font-bold">게시물</p></div>
          <div><p className="text-sm font-bold text-gray-900">0</p><p className="text-[10px] text-gray-400 font-bold">팔로워</p></div>
          <div><p className="text-sm font-bold text-gray-900">0</p><p className="text-[10px] text-gray-400 font-bold">팔로잉</p></div>
        </div>

        {/* 3. 프로필 이미지 및 상세 정보 */}
        <div className="flex flex-col items-center justify-center py-4 border-b border-gray-100">
          <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shadow-inner">
            <span className="text-3xl">🐶</span>
          </div>
          
          <div className="text-center mt-3 space-y-1">
            <p className="text-sm font-bold text-gray-800">
              {profile ? `${profile.breed}` : "품종 미등록"}
            </p>
            <p className="text-xs text-gray-400 font-medium">
              {profile ? `${profile.age}살 · ${profile.gender === 'male' ? '남아 ♂' : '여아 ♀'}` : "상세 정보 없음"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}