// src/app/page.tsx
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/tournaments" className="block">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  大会リスト
                </h2>
                <p className="text-gray-600">大会情報の一覧を確認</p>
              </div>
            </Link>

            <Link href="/players" className="block">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  プレイヤーリスト
                </h2>
                <p className="text-gray-600">登録プレイヤーの一覧</p>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Link href="/contact" className="block">
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    お問い合わせ
                  </h2>
                  <p className="text-gray-600">お問い合わせはこちら</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
