import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">
        온라인 서점에 오신 걸 환영합니다 📖
      </h1>
      <p className="text-lg text-gray-600">
        개발자들을 위한 필독 서적들을 한 곳에서 모아 보는 서비스입니다.
      </p>

      <nav className="flex gap-4 mt-4">
        <Link
          href="/"
          className="px-4 py-2 rounded border border-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:font-medium"
        >
          홈
        </Link>

        <Link
          href="/books"
          className="px-4 py-2 rounded border border-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:font-medium"
        >
          책 목록
        </Link>

        <Link
          href="/cart"
          className="px-4 py-2 rounded border border-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:font-medium"
        >
          장바구니
        </Link>
      </nav>
    </div>
  );
}
