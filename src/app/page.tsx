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

  // 🔐 구글 로그인 여부를 관리하는 상태
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

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalPayload = {
      ...formData,
      displayAge: formData.age ? `${formData.age}살` : "",
      profileImage: previewImage
    };

    console.log("최종 승인 데이터:", finalPayload);
    alert(`⭐ 스타 입성 완료! 🐾\n${formData.petName}가 전국 집사들의 마음을 훔치러 출발합니다!`);
    router.push('/feed');
  };

  // 🌐 구글 로그인 버튼 클릭 시 트리거
  const handleGoogleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 relative flex flex-col overflow-hidden">
      
      {/* 배경 레이아웃 (헤더 및 피드 스켈레톤) */}
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

      {/* 1단계: 로그인 전 - 구글 소셜 로그인 권장 화면 레이어 */}
      {!isLoggedIn && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-between p-6 bg-slate-50/95 backdrop-blur-sm">
          <div className="w-full max-w-sm text-center mt-16 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-orange-500">PetStar 🐾</h1>
            <p className="text-sm text-slate-500 font-medium">반려동물과 AI 페르소나가 함께하는 특별한 공간</p>
          </div>

          <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl border border-slate-100 space-y-4">
            <div className="text-center pb-2">
              <h2 className="text-lg font-bold text-slate-800">지금 바로 시작해보세요</h2>
              <p className="text-xs text-slate-400 mt-1">AI 친구들이 당신을 기다리고 있어요</p>
            </div>

            {/* 구글 로그인 버튼 */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl border border-slate-200 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="