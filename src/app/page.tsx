"use client";

import React, { useState, useRef } from 'react';
// 💡 Next.js의 페이지 이동을 위해 router를 불러옵니다.
import { useRouter } from 'next/navigation';

interface PetProfileInput {
  petName: string;
  gender: 'male' | 'female';
  age: string;
  breed: string;
}

export default function HomePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // 💡 라우터 인스턴스 생성

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

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalPayload = {
      ...formData,
      displayAge: formData.age ? `${formData.age}살` : "",
      profileImage: previewImage
    };

    console.log("최종 승인 데이터:", finalPayload);
    
    // Option 3 알림창 띄우기
    alert(`⭐ 스타 입성 완료! 🐾\n${formData.petName}가 전국 집사들의 마음을 훔치러 출발합니다!`);
    
    // 💡 [핵심] 알림창 확인을 누르면 작업해두신 feed 페이지로 바로 쏴줍니다.
    router.push('/feed');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 relative flex flex-col overflow-hidden">
      
      {/* 바텀 시트 뒷배경 (스켈레톤 레이아웃) */}
      <header className="w-full h-12 bg-white border-b border-gray-100 px-4 flex items-center justify-between sticky top-0 z-40">
        <span className="font-extrabold text-amber-500 tracking-tight text-lg">PetStar ✨</span>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">🐶</div>
      </header>

      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-bold text-gray-800">🔥 실시간 인기 펫피드</p>
          <div className="w-full h-44 bg-gray-100 rounded-xl mt-3 animate-pulse" />
        </div>
      </main>

      {/* 프로필 등록 권유 바텀 시트 */}
      {!hasProfile && (
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
                펫스타(PetStar)는 반려동물에 의한, 반려동물을 위한 공간입니다.{" "}
                <span className="text-amber-500 font-bold block mt-0.5">매주 새로운 스타가 탄생하는 이곳에서 활동할,</span>{" "}
                우리 아이의 프로필을 완성해 주세요.
              </p>
            </div>

            {/* 1. 발바닥을 없애고 정중앙 사진 아이콘만 배치한 프로필 이미지 업로드 구역 */}
<div className="flex flex-col items-center mb-6">
  <input 
    type="file" 
    ref={fileInputRef} 
    className="hidden" 
    accept="image/*" 
    onChange={handleImageChange} 
  />
  <div 
    onClick={() => fileInputRef.current?.click()}
    className="relative w-20 h-20 rounded-full bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center cursor-pointer select-none shadow-inner group hover:bg-gray-100 transition-all"
  >
    {previewImage ? (
      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
    ) : (
      /* 📸 이미지가 없을 때 정중앙에 회색조로 표시될 기본 카메라 아이콘 */
      <svg 
        className="w-8 h-8 text-gray-400 group-hover:text-gray-500 transition-colors" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    )}
  </div>
</div>

            {/* 인풋 폼 섹션 */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">반려동물 이름</label>
                <input type="text" name="petName" value={formData.petName} onChange={handleChange} required placeholder="예: 뭉치" className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 성별 굵은 SVG 버튼 */}
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">성별</label>
                  <div className="w-full h-11 bg-gray-50 border border-gray-200 rounded-xl p-1 flex items-center justify-between gap-1">
                    <button type="button" onClick={() => handleGenderSelect('male')} className={`flex-1 h-full rounded-lg flex items-center justify-center ${formData.gender === 'male' ? 'bg-blue-50 text-blue-600 border border-blue-200/50' : 'text-gray-300'}`}>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><circle cx="10" cy="14" r="5" /><polyline points="15 3 21 3 21 9" /><line x1="14" y1="10" x2="21" y2="3" /></svg>
                    </button>
                    <button type="button" onClick={() => handleGenderSelect('female')} className={`flex-1 h-full rounded-lg flex items-center justify-center ${formData.gender === 'female' ? 'bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-200/50' : 'text-gray-300'}`}>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><circle cx="12" cy="9" r="5" /><line x1="12" y1="14" x2="12" y2="21" /><line x1="9" y1="18" x2="15" y2="18" /></svg>
                    </button>
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