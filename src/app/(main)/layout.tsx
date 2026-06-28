"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
        
        {/* 헤더 영역 삭제 완료: 로고가 중복 출력되지 않습니다. */}

        {/* 내부 콘텐츠 영역 */}
        {/* overflow-y-auto를 추가하여 내부 스크롤이 자연스럽게 되도록 했습니다 */}
        <main className="flex-1 flex flex-col min-h-0 relative overflow-y-auto">
          {children}
        </main>

        {/* 하단 고정 탭 내비게이션 바 */}
        <nav className="w-full bg-white border-t border-gray-200 h-16 flex justify-around items-center flex-shrink-0 z-50">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
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