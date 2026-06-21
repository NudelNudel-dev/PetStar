"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link"; // 1. Link 컴포넌트 임포트 (useRouter는 이제 지워도 됩니다)

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "투표", path: "/vote", icon: "🗳️" },
    { name: "랭킹", path: "/ranking", icon: "🏆" },
    { name: "업로드", path: "/upload", icon: "➕" },
    { name: "피드", path: "/feed", icon: "📱" },
    { name: "내 정보", path: "/profile", icon: "🐶" },
  ];

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[430px] h-screen bg-white shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* 상단 타이틀 바 */}
        <header className="p-4 border-b border-gray-100 bg-white flex justify-between items-center h-[57px] flex-shrink-0 z-50">
          <h1 className="text-xl font-bold text-amber-500 tracking-wider">PetStar ⭐</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-amber-50 border border-amber-100 rounded-full overflow-hidden text-[11px] font-bold text-amber-600 h-7">
              <div className="pl-2.5 pr-1.5 flex items-center space-x-1">
                <span>🐾</span>
                <span>3/3</span>
              </div>
              <button className="pr-2.5 pl-1 h-full text-amber-400 hover:text-amber-600 border-l border-amber-200/60 transition-colors">
                +
              </button>
            </div>
            <button className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-xs transition-all shadow-sm">
              🔔
            </button>
          </div>
        </header>

        {/* 내부 콘텐츠 영역 */}
        <main className="flex-1 flex flex-col min-h-0 relative">
          {children}
        </main>

        {/* 2. 하단 고정 탭 내비게이션 바 (button 대신 Link 사용) */}
        <nav className="w-full bg-white border-t border-gray-200 h-16 flex justify-around items-center flex-shrink-0 z-50">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path} // onClick 대신 href 제공
                className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive ? "text-amber-500 font-bold" : "text-gray-400 hover:text-amber-500"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs mt-0.5">{item.name}</span>
              </Link>
            );
          })}
        </nav>

      </div>
    </div>
  );
}