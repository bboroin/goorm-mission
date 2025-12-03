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
    </div>
  );
}
