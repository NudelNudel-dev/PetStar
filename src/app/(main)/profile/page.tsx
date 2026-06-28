"use client";

import React, { useEffect, useState, useRef } from 'react';

// 계정/프로필 타입 정의
interface ProfileData {
  id: string;
  pet_name: string;
  gender: 'male' | 'female';
  age: number;
  breed: string;
  profile_image?: string;
  posts: string[]; // 게시물 이미지 URL 배열
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 실제 데이터 연동 시 이 부분을 API 호출로 변경
    setProfile({
      id: "jinse_seo",
      pet_name: "뭉치",
      gender: "male",
      age: 2,
      breed: "골든리트리버",
      posts: Array(15).fill("https://via.placeholder.com/150") // 예시 게시물 15개
    });
    setLoading(false);
  }, []);

  // 기능3: 프로필 사진 변경 핸들러
  const handleProfileImageClick = () => fileInputRef.current?.click();

  if (loading) return <div className="p-10 text-center">로딩중...</div>;

  return (
    <div className="w-full min-h-screen bg-white pb-20 relative">
      <div className="p-4">
        {/* 상단 계정 ID 및 설정 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowAccountModal(true)}>
            <h1 className="text-xl font-black">{profile?.id}</h1>
            <span className="text-gray-400 text-sm">▼</span>
          </div>
          <button className="text-xl" onClick={() => alert("계정 정보 수정 기능 구현 예정")}>⚙️</button>
        </div>

        {/* 프로필 이미지 및 반려동물 정보 */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center cursor-pointer" onClick={handleProfileImageClick}>
            <span className="text-2xl">📷</span>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
          </div>
          <p className="font-black text-xl">{profile?.pet_name} ♂ {profile?.age}살</p>
          <p className="text-sm text-gray-500">{profile?.breed}</p>
        </div>

        {/* 게시물 그리드 (기능5: 최신순 정렬) */}
        <div className="grid grid-cols-3 gap-1">
          {profile?.posts.map((post, i) => (
            <div key={i} className="aspect-square bg-gray-200">
              <img src={post} alt={`post-${i}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* 기능1: 계정 전환 모달 */}
      {showAccountModal && (
        <div className="absolute inset-0 bg-black/50 z-50 flex flex-col items-center justify-center p-6" onClick={() => setShowAccountModal(false)}>
          <div className="bg-white w-full max-w-sm rounded-2xl p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 p-2 bg-gray-100 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <p className="font-bold">{profile?.id}</p>
            </div>
            <button className="w-full p-3 border border-dashed border-gray-300 rounded-xl text-gray-500">+ 계정 추가하기</button>
          </div>
        </div>
      )}
    </div>
  );
}