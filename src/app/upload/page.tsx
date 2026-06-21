'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsVideo(file.type.startsWith('video/'));
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile || isLoading) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('caption', (e.currentTarget.elements.namedItem('caption') as HTMLTextAreaElement).value);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert('🎉 게시물이 성공적으로 등록되었습니다!');
        router.push('/feed'); // 업로드 성공 시 피드 페이지로 이동
      } else {
        alert(`업로드 실패: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('서버 통신 중 에러가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-white flex flex-col z-[9999] overflow-hidden">
      
      {/* 상단 단독 네비게이션 바 */}
      <header className="flex justify-between items-center px-4 h-[57px] border-b border-gray-200 bg-white flex-shrink-0">
        <button className="text-2xl text-gray-800" onClick={() => window.history.back()} disabled={isLoading}>✕</button>
        <h2 className="text-base font-semibold text-gray-800">새 게시물</h2>
        <button 
          className="text-base font-semibold text-blue-500 disabled:text-gray-400" 
          type="submit" 
          form="upload-form"
          disabled={isLoading}
        >
          {isLoading ? '등록 중...' : '공유'}
        </button>
      </header>

      {/* 업로드 폼 */}
      <form id="upload-form" className="flex-1 flex flex-col overflow-y-auto" onSubmit={handleSubmit}>
        
        {/* 미디어 영역 (정사각형) */}
        <div className="w-full aspect-square bg-gray-50 relative flex justify-center items-center border-b border-gray-200">
          <input 
            type="file" 
            id="file-input" 
            accept="image/*, video/*" 
            onChange={handleFileChange}
            className="hidden"
            required 
          />
          
          {/* 상태 A: 파일 선택 전 */}
          {!previewUrl && (
            <label htmlFor="file-input" className="flex flex-col items-center cursor-pointer">
              <div className="text-4xl mb-3">📸</div>
              <span className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs font-semibold shadow-sm">
                기기에서 선택
              </span>
            </label>
          )}
          
          {/* 상태 B: 파일 선택 후 */}
          {previewUrl && (
            <div className="absolute inset-0 w-full h-full">
              {isVideo ? (
                <video src={previewUrl} controls autoPlay muted loop className="w-full h-full object-cover" />
              ) : (
                <img src={previewUrl} alt="미리보기" className="w-full h-full object-cover" />
              )}
              <label htmlFor="file-input" className="absolute bottom-4 right-4 bg-black/75 text-white px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer z-10">
                다시 선택
              </label>
            </div>
          )}
        </div>

        {/* 글 작성 영역 */}
        <div className="p-4 flex-1">
          <textarea 
            name="caption" 
            placeholder="반려동물과의 소중한 추억을 적어보세요..." 
            maxLength={500}
            className="w-full h-32 border-none resize-none text-sm outline-none leading-relaxed"
            disabled={isLoading}
          ></textarea>
        </div>

      </form>
    </div>
  );
}