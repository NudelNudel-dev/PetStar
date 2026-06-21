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

      {!isLoggedIn && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-between p-6 bg-slate-50/95 backdrop-blur-sm">
          <div className="w-full max-w-sm text-center mt-16 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-orange-500">PetStar 🐾</h1>
            <p className="text-sm text-slate-500 font-medium">우리집 막내가 월드 스타가 되는 공간</p>
          </div>

          <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl border border-slate-100 space-y-4">
            <div className="text-center pb-2">
              <h2 className="text-lg font-bold text-slate-800">지금 바로 시작해보세요</h2>
              <p className="text-xs text-slate-400 mt-1">손에 땀을 쥐는 콘테스트가 기다리고 있어요!</p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl border border-slate-200 transition-colors shadow-sm"
            >
              Google 계정으로 계속하기
            </button>
            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-[#Fee500] hover:bg-[#Fade00] text-[#191919] font-semibold py-3 px-4 rounded-xl transition-colors">
              카카오톡으로 계속하기
            </button>
          </div>
          <div className="text-xs text-slate-400 mt-12 mb-4">© 2026 PetStar. All rights reserved.</div>
        </div>
      )}

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
                <input type="text" name="petName" value={formData.petName} onChange={handleChange} required placeholder="예: 뭉치" className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">성별</label>
                  <div className="w-full h-11 bg-gray-50 border border-gray-200 rounded-xl p-1 flex items-center justify-between gap-1">
                    <button type="button" onClick={() => handleGenderSelect('male')} className={`flex-1 h-full rounded-lg flex items-center justify-center ${formData.gender === 'male' ? 'bg-blue-50 text-blue-600 border border-blue-200/50' : 'text-gray-300'}`}>남</button>
                    <button type="button" onClick={() => handleGenderSelect('female')} className={`flex-1 h-full rounded-lg flex items-center justify-center ${formData.gender === 'female' ? 'bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-200/50' : 'text-gray-300'}`}>여</button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">나이</label>
                  <div className="relative flex items-center">
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="예: 2" className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium pr-8" />
                    <span className="absolute right-3.5 text-xs font-bold text-gray-400">살</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">품종</label>
                <input type="text" name="breed" value={formData.breed} onChange={handleChange} required placeholder="예: 진돗개" className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium" />
              </div>
            </div>

            <button type="submit" className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-md mt-6">
              프로필 등록 완료하고 시작하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
}