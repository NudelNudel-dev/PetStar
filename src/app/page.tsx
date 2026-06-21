"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface PetProfileInput {
  petName: string;
  gender: 'male' | 'female';
  age: string;
  breed: string;
}

export default function HomePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [hasProfile, setHasProfile] = useState<boolean>(false);

  const [formData, setFormData] = useState<PetProfileInput>({
    petName: "",
    gender: "male",
    age: "",
    breed: ""
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          profileImage: previewImage
        }),
      });

      if (!response.ok) {
        throw new Error('프로필 저장 실패');
      }

      alert(`⭐ 스타 입성 완료! 🐾\n${formData.petName}가 전국 집사들의 마음을 훔치러 출발합니다!`);
      
      setHasProfile(true);
      router.push('/feed');
    } catch (error) {
      console.error(error);
      alert('데이터베이스 저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleGoogleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 relative flex flex-col overflow-hidden">
      
      {/* 배경 레이아웃 (피드 스켈레톤) */}
      <header className="w-full h-12 bg-white border-b border-gray-100 px-4 flex items-center justify-between sticky top-0 z-40">
        <span className="font-extrabold text-orange-500 tracking-tight text-lg">PetStar 🐾</span>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">🐶</div>
      </header>

      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-bold text-gray-800">🔥 실시간 인기 펫피드</p>
          <div className="w-full h-44 bg-gray-100 rounded-xl mt-3 animate-pulse" />
        </div>
      </main>

      {/* 1단계: 로그인 전 - 유저 요청 기반 문구 반영 레이어 */}
      {!isLoggedIn && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-between p-6 bg-slate-50/95 backdrop-blur-sm">
          <div className="w-full max-w-sm text-center mt-16 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-orange-500">PetStar 🐾</h1>
            {/* 📝 수정 문구 1: 메인 한 줄 카피 변경 완료 */}
            <p className="text-sm text-slate-500 font-medium">우리집 막내가 월드 스타가 되는 공간</p>
          </div>

          <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl border border-slate-100 space-y-4">
            <div className="text-center pb-2">
              <h2 className="text-lg font-bold text-slate-800">지금 바로 시작해보세요</h2>
              {/* 📝 수정 문구 2: 하단 서브 카피 변경 완료 */}
              <p className="text-xs text-slate-400 mt-1">손에 땀을 쥐는 콘테스트가 기다리고 있어요!</p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl border border-slate-200 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google 계정으로 계속하기
            </button>

            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-[#Fee500] hover:bg-[#Fade00] text-[#191919] font-semibold py-3 px-4 rounded-xl transition-colors">
              카카오톡으로 계속하기
            </button>
          </div>
          <div className="text-xs text-slate-400 mt-12 mb-4">© 2026 PetStar. All rights reserved.</div>
        </div>
      )}

      {/* 2단계: 로그인 후 프로필 등록 바텀 시트 */}
      {isLoggedIn && !hasProfile && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1.5px]" />

          <form 
            onSubmit={handleProfileSubmit}
            className="relative bg-white rounded-t-3xl p-6 shadow-2xl z-10 flex flex-col max-h-[85%] overflow-y-auto"
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

            <div className="text-center mb-5 px-2">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">반려동물 프로필 등록</h2>
              <p className="text-xs text-gray-500 font-semibold mt-2.5 tracking-wide leading-relaxed break-keep">
                우리 아이의 프로필을 완성해 주세요.
              </p>
            </div>

            <div className="flex flex-col items-center mb-6">
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-20 h-20 rounded-full bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center cursor-pointer select-none shadow-inner group hover:bg-gray-100 transition-all"
              >
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">📸</span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">반려동물 이름</label>