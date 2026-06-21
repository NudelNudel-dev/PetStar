"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    console.log("구글 OAuth 로그인 요청");
    router.push('/');
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between p-6">
      
      {/* 1. 상단 여백 */}
      <div className="h-12" />

      {/* 2. 중앙 브랜드 로고 및 슬로건 */}
      <div className="flex flex-col items-center justify-center text-center flex-1 -mt-12">
        <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center shadow-sm mb-5 animate-bounce">
          <span className="text-4xl">🐾</span>
        </div>
        
        <h1 className="text-3xl font-black text-amber-500 tracking-tight">
          PetStar
        </h1>
        
        <p className="text-xs text-gray-400 font-bold mt-3 tracking-wide leading-relaxed">
          이 귀여움은 나만 볼 수 없지!<br />
          전국 집사들의 최애 펫 투표 시작!
        </p>
      </div>

      {/* 3. 하단 구글 로그인 버튼 및 약관 고지 (에러 전면 수정) */}
      <div className="w-full max-w-sm mx-auto space-y-4 pb-6">
        
        <button 
          onClick={handleGoogleLogin}
          className="w-full h-12 border border-gray-200 rounded-xl flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 active:scale-[0.99] transition-all shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.58z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.32 14.24A7.16 7.16 0 0 1 4.91 12c0-.79.13-1.57.38-2.31V6.54H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.39l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z"
            />
          </svg>
          <span className="text-sm font-bold text-gray-700">Google 계정으로 시작하기</span>
        </button>
        
        {/* 💡 깨져있던 <span> 구조와 닫는 태그 순서를 엄격하게 교정했습니다. */}
        <p className="text-[10px] text-gray-400 text-center leading-normal px-4">
          계정을 생성함으로써 PetStar의{" "}
          <span className="underline cursor-pointer hover:text-gray-600">서비스 이용약관</span>
          {" 및 "}
          <span className="underline cursor-pointer hover:text-gray-600">개인정보 처리방침</span>
          에 동의하게 됩니다.
        </p>
      </div>

    </div>
  );
}