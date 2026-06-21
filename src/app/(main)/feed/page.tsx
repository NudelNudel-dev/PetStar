"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 👈 이동 기능(Router) 정상 등록

interface Post {
  id: string | number;
  userName: string;
  userAvatar: string;
  petName: string;
  imageUrl: string;
  caption: string;
  baseLikes: number;
  isLiked: boolean;
  comments: any[];
  createdAt: string;
}

export default function FeedPage() {
  const router = useRouter(); // 👈 라우터 초기화
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"recommend" | "follow">("recommend");
  
  // 상태 관리: 빈 배열로 시작해서 데이터 fetch 후 채워짐
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // 댓글 모달 관리용 State
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | number | null>(null);
  const [newCommentText, setNewCommentText] = useState("");

  // 🔄 백엔드 데이터 읽어오기 (더미 데이터 완전 제거 및 빈 배열 백업)
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/upload");
      const result = await response.json();
      
      if (result.success && result.posts) {
        // 서버에서 받아온 실제 글들만 포맷팅하여 주입
        const serverPosts = result.posts.map((post: any) => ({
          id: post.id,
          userName: "PetStar_User",
          userAvatar: "⭐",
          petName: "나의 아기천사",
          imageUrl: post.imageUrl,
          caption: post.caption,
          baseLikes: Math.floor(Math.random() * 10), 
          isLiked: false,
          comments: [],
          createdAt: post.createdAt,
        }));

        setPosts(serverPosts); // 👈 청정 서버 데이터만 주입!
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("피드 로딩 실패:", error);
      setPosts([]); // 에러 발생 시 안전하게 빈 배열 처리
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 좋아요 토글 기능
  const handleToggleLike = (id: string | number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, isLiked: !post.isLiked } : post
      )
    );
  };

  // 댓글 모달 열기 핸들러
  const openComments = (postId: string | number) => {
    setSelectedPostId(postId);
    setIsCommentsOpen(true);
  };

  // 새 댓글 등록 기능
  const handleAddComment = () => {
    if (!newCommentText.trim() || selectedPostId === null) return;

    setPosts(
      posts.map((post) => {
        if (post.id === selectedPostId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(),
                avatar: "🙋‍♂️",
                name: "나(유저)",
                text: newCommentText.trim(),
              },
            ],
          };
        }
        return post;
      })
    );

    setNewCommentText("");
  };

  // 공유 기능 
  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: "PetStar 반려동물 자랑",
        text: title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("게시물 링크가 복사되었거나 공유 기능을 준비 중입니다!");
    }
  };

  // 검색 필터링 로직 (오타 및 함수 탈출 괄호 완벽 교정)
  const filteredPosts = posts.filter((post) => 
    post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.petName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentPost = posts.find((p) => p.id === selectedPostId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50">
        <span className="text-gray-500 text-sm font-medium">피드를 불러오는 중...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0 relative bg-gray-50">
      
      {/* 상단 검색창 및 탭 영역 */}
      <div className="bg-white pt-2 pb-3 space-y-3 flex-shrink-0 border-b border-gray-100 px-4 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 귀여운 반려동물 이름이나 내용 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-sm text-gray-800 placeholder-gray-400"
          />
        </div>

        <div className="flex font-bold text-base">
          <button
            onClick={() => setActiveTab("recommend")}
            className={`flex-1 pb-2 text-center transition-colors border-b-2 ${
              activeTab === "recommend" ? "text-amber-500 border-amber-500" : "text-gray-400 border-transparent"
            }`}
          >
            추천 피드
          </button>
          <button
            onClick={() => setActiveTab("follow")}
            className={`flex-1 pb-2 text-center transition-colors border-b-2 ${
              activeTab === "follow" ? "text-amber-500 border-amber-500" : "text-gray-400 border-transparent"
            }`}
          >
            팔로우 소식
          </button>
        </div>
      </div>

      {/* 게시물 카드 피드 리스트 (수정 완료) */}
      <div className={`flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-24 ${isCommentsOpen ? 'overflow-hidden pointer-events-none' : ''}`}>
        {filteredPosts.length === 0 ? (
          /* 💡 피드가 텅 비었을 때 노출될 예쁜 텅 빈 화면(Empty State) */
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-4 pointer-events-auto">
            <div className="text-6xl">📸</div>
            <div className="space-y-1">
              <p className="text-gray-800 font-bold text-lg">아직 등록된 게시물이 없어요</p>
              <p className="text-gray-400 text-sm">우리 아이의 귀여운 첫 순간을 공유해보세요!</p>
            </div>
            <button 
              onClick={() => router.push('/upload')} 
              className="mt-2 px-6 h-12 bg-amber-500 text-white rounded-xl font-bold shadow-md hover:bg-amber-600 transition-all active:scale-95 text-sm"
            >
              첫 게시물 올리러 가기 🐾
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const totalLikes = post.isLiked ? post.baseLikes + 1 : post.baseLikes;
            const isVideo = post.imageUrl.endsWith(".mp4") || post.imageUrl.includes("video");

            return (
              <article key={post.id} className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl shadow-inner">
                      {post.userAvatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-base">{post.userName}</h3>
                      <p className="text-xs text-amber-600 font-medium">🐾 {post.petName}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* 미디어 영역 */}
                <div className="relative aspect-square w-full bg-gray-50">
                  {isVideo ? (
                    <video src={post.imageUrl} controls muted loop className="w-full h-full object-cover" />
                  ) : (
                    <img src={post.imageUrl} alt={post.petName} className="w-full h-full object-cover" />
                  )}
                </div>

                <div className="p-4 space-y-3">
                  {/* 버튼 라인 */}
                  <div className="flex items-center space-x-1.5 flex-wrap">
                    <button
                      onClick={() => handleToggleLike(post.id)}
                      className={`flex items-center space-x-1.5 border px-3.5 py-2 rounded-full transition-all active:scale-95 ${
                        post.isLiked 
                          ? 'bg-red-50 border-red-200 text-red-500 shadow-sm' 
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-base">{post.isLiked ? '❤️' : '♡'}</span>
                      <span className="text-sm font-bold">{totalLikes}</span>
                    </button>
                    
                    <button 
                      onClick={() => openComments(post.id)}
                      className="flex items-center space-x-1.5 bg-gray-50 border border-gray-200 text-gray-600 px-3.5 py-2 rounded-full active:scale-95 hover:bg-gray-100 transition-all"
                    >
                      <span className="text-base">💬</span>
                      <span className="text-sm font-medium">댓글 달기 ({post.comments.length})</span>
                    </button>

                    <button 
                      onClick={() => handleShare(post.caption)}
                      className="flex items-center space-x-1.5 bg-gray-50 border border-gray-200 text-gray-600 px-3.5 py-2 rounded-full active:scale-95 hover:bg-amber-50 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                      </svg>
                      <span className="text-sm font-medium">공유하기</span>
                    </button>
                  </div>

                  <p className="text-gray-800 text-base leading-relaxed pt-1 whitespace-pre-wrap">{post.caption}</p>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* [댓글 바텀 시트 모달 Overlay] */}
      {isCommentsOpen && currentPost && (
        <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end pointer-events-auto">
          <div className="absolute inset-0 -z-10" onClick={() => setIsCommentsOpen(false)} />

          <div className="bg-white w-full max-h-[75%] rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden">
            
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white flex-shrink-0">
              <div className="flex items-center space-x-2">
                <span className="text-xl text-amber-500">💬</span>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">댓글 ({currentPost.comments.length})</h2>
              </div>
              <button 
                onClick={() => setIsCommentsOpen(false)} 
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-gray-600 transition-all active:scale-95"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white">
              {currentPost.comments.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">첫 댓글을 남겨보세요! 🐾</div>
              ) : (
                currentPost.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-lg flex-shrink-0 shadow-inner">
                      {comment.avatar}
                    </div>
                    <div className="flex-1 flex flex-col space-y-1 pt-0.5">
                      <span className="font-bold text-gray-900 text-sm tracking-tight">
                        {comment.name}
                      </span>
                      <div className="text-sm text-gray-700 leading-relaxed break-all pr-2">
                        {comment.text}
                      </div>
                      <div className="flex items-center space-x-3 pt-0.5 text-xs text-gray-400">
                        <span>방금 전</span>
                        <button className="font-semibold hover:text-gray-600">답글 달기</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-100 flex items-center space-x-2 bg-white pb-6">
              <input 
                type="text" 
                placeholder="따뜻한 댓글을 남겨주세요..." 
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddComment();
                }}
                className="flex-1 h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-gray-800 placeholder-gray-400"
              />
              <button 
                onClick={handleAddComment}
                disabled={!newCommentText.trim()}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${
                  newCommentText.trim() 
                    ? 'bg-amber-500 text-white hover:bg-amber-600' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5 transform rotate-45 -translate-x-0.5 translate-y-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}