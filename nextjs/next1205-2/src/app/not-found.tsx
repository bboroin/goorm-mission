import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-red-500">
        404 - 페이지를 찾을 수 없습니다
      </h1>
      <p className="text-gray-600">
        잘못된 경로이거나 존재하지 않는 콘텐츠입니다.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded border border-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:font-medium"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
