"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserPost {
  id: string | number;
  imageUrl: string;
  createdAt: string;
}

type TabType = 'feed' | 'video' | 'trophy';

export default function ProfilePage() {
  const router = useRouter();

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('feed');

  const [stats, setStats] = useState<{
    followers: number | string | null;
    following: number | string | null;
  }>({
    followers: null,
    following: null
  });

  const [petInfo, setPetInfo] = useState<{
    name: string | null;
    gender: 'male' | 'female' | null;
    age: number | string | null;
    breed: string | null;
  }>({
    name: null,   
    gender: null, 
    age: null,    
    breed: null   
  });

  // 🤖 AI 페르소나 피드 업로드 지시용 트리거 함수
  // 상단 ID 영역(jinse_seo)을 마우스로 '클릭'하면 AI가 즉시 게시물과 프로필을 채우도록 세팅했습니다!
  const handleAiUploadCommand = () => {
    setIsLoading(true);
    alert("🤖 AI 페르소나 지시 확인! 피드 및 프로필 데이터를 동적으로 업로드합니다.");
    
    setTimeout(() => {
      // 1. 프로필 이미지 주입
      setProfileImageUrl("https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop");
      
      // 2. 반려동물 정보 및 스탯 주입
      setPetInfo({
        name: "밀로",
        gender: "male",
        age: "2살",
        breed: "골든 리트리버"
      });
      setStats({
        followers: 128,
        following: 94
      });

      // 3. AI 페르소나 피드 게시물 주입 (3개)
      setUserPosts([
        { id: 1, imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=500&auto=format&fit=crop", createdAt: "방금 전" },
        { id: 2, imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500&auto=format&fit=crop", createdAt: "1시간 전" },
        { id: 3, imageUrl: "https://images.unsplash.com/photo-1537151625747-768eb64269f5?q=80&w=500&auto=format&fit=crop", createdAt: "2시간 전" }
      ]);
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="w-full bg-white pb-24 relative min-h-0 flex-1 overflow-y-auto">
      
      {/* 상단 바 */}
      <div className="px-4 h-12 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-40">
        <button 
          onClick={() => router.push('/upload')}
          className="w-8 h-8 flex items-center justify-start text-2xl text-gray-800 hover:text-amber-500 transition-colors"
        >
          +
        </button>

        {/* 💡 여기 계정 ID 영역을 누르면 AI 업로드 명령이 작동합니다! */}
        <div 
          onClick={handleAiUploadCommand}
          className="flex items-center space-x-1 font-bold text-gray-900 tracking-wide text-base cursor-pointer hover:text-amber-500 transition-colors"
        >
          <span>jinse_seo</span>
          <span className="text-xs text-gray-400 mt-0.5">▼</span>
        </div>

        <button className="w-8 h-8 flex items-center justify-end text-lg text-gray-500 hover:text-gray-800 transition-colors">
          ⚙️
        </button>
      </div>

      {/* 상단 스탯 카운터 */}
      <section className="px-5 pt-5 border-b border-gray-50 flex justify-around text-center py-4 bg-gray-50/30">
        <div>
          <div className="font-bold text-base text-gray-800">
            {userPosts.length > 0 ? userPosts.length : "N/A"}
          </div>
          <div className="text-[11px] text-gray-400 font-semibold tracking-wide">게시물</div>
        </div>
        <div className="border-l border-gray-100 h-8 my-auto" />
        <div>
          <div className="font-bold text-base text-gray-800">
            {stats.followers !== null ? stats.followers : "N/A"}
          </div>
          <div className="text-[11px] text-gray-400 font-semibold tracking-wide">팔로워</div>
        </div>
        <div className="border-l border-gray-100 h-8 my-auto" />
        <div>
          <div className="font-bold text-base text-gray-800">
            {stats.following !== null ? stats.following : "N/A"}
          </div>
          <div className="text-[11px] text-gray-400 font-semibold tracking-wide">팔로잉</div>
        </div>
      </section>

      {/* 프로필 메인 정보 */}
      <section className="px-5 flex flex-col items-center text-center py-6">
        {!profileImageUrl ? (
          <button 
            onClick={() => alert("프로필 사진 등록 팝업 연결 예정")}
            className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shadow-sm hover:bg-gray-200 transition-all mb-4 text-3xl"
          >
            📷
          </button>
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shadow-sm relative mb-4">
            <img src={profileImageUrl} alt="프로필 사진" className="w-full h-full object-cover" />
            <button 
              onClick={() => alert("프로필 사진 변경/추가 팝업 연결 예정")}
              className="absolute bottom-0 right-0 w-7 h-7 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white text-base font-bold shadow-md hover:bg-blue-600 transition-all"
            >
              +
            </button>
          </div>
        )}
        
        <div className="flex items-center space-x-1.5">
          <span className="font-bold text-gray-900 text-lg">{petInfo.name || "N/A"}</span>
          {petInfo.gender && (
            <span className="text-sm text-blue-500">{petInfo.gender === 'male' ? '♂️' : '♀️'}</span>
          )}
          <span className="text-xs text-gray-400 font-medium">{petInfo.age ? `(${petInfo.age})` : "(N/A)"}</span>
        </div>
        
        <p className="text-xs text-gray-500 font-medium mt-1">{petInfo.breed || "N/A"}</p>
      </section>

      {/* 미디어 탭 헤더 */}
      <div className="border-t border-b border-gray-100 flex h-11 justify-around items-center bg-white">
        <button 
          onClick={() => setActiveTab('feed')}
          className={`flex-1 h-full flex items-center justify-center transition-all ${
            activeTab === 'feed' ? 'border-b-2 border-amber-500 text-amber-500 font-bold' : 'text-gray-400'
          }`}
        >
          🖼️
        </button>
        <button 
          onClick={() => setActiveTab('video')}
          className={`flex-1 h-full flex items-center justify-center transition-all ${
            activeTab === 'video' ? 'border-b-2 border-amber-500 text-amber-500 font-bold' : 'text-gray-400'
          }`}
        >
          📹
        </button>
        <button 
          onClick={() => setActiveTab('trophy')}
          className={`flex-1 h-full flex items-center justify-center transition-all ${
            activeTab === 'trophy' ? 'border-b-2 border-amber-500 text-amber-500 font-bold' : 'text-gray-400'
          }`}
        >
          🏆
        </button>
      </div>

      {/* 🎬 탭 선택에 따른 동적 피드 콘텐츠 영역 */}
      <section className="p-4">
        {activeTab === 'feed' && (
          userPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl text-gray-400">📷</div>
              <div className="space-y-0.5">
                <p className="text-gray-800 font-bold text-base">게시물 없음</p>
                <p className="text-gray-400 text-xs">게시한 사진들이 여기에 표시됩니다.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1.5">
              {userPosts.map((post) => (
                <div key={post.id} className="aspect-square bg-gray-50 border border-gray-100 rounded-lg overflow-hidden relative shadow-sm">
                  <img src={post.imageUrl} alt="업로드 미디어" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'video' && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl text-gray-400">📹</div>
            <div className="space-y-0.5">
              <p className="text-gray-800 font-bold text-base">게시된 동영상 없음</p>
              <p className="text-gray-400 text-xs">게시한 영상들이 여기에 표시됩니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'trophy' && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl text-gray-400">🏆</div>
            <div className="space-y-0.5">
              <p className="text-gray-800 font-bold text-base">수상 내역 없음</p>
              <p className="text-gray-400 text-xs">랭킹전 수상 내역이 여기에 표시됩니다.</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-4 text-xs text-gray-400 font-medium">
            사진을 더 불러오는 중... 🐾
          </div>
        )}
      </section>

    </div>
  );
}