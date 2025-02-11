// src/app/page.tsx
"use client";

import Link from "next/link";
import ArticleList from "@/components/ui/ArticleList";
import { getArticles } from "@/lib/articles";
import { useEffect, useState } from "react";
import { Article } from "@/lib/articles";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // 記事一覧を取得して状態を更新
    const loadedArticles = getArticles();
    setArticles(loadedArticles);
  }, []); // 空の依存配列で、コンポーネントのマウント時に1回だけ実行

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                記事一覧
              </h1>
              <p className="text-gray-600">知識の共有・発見の場所</p>
            </div>

            <Link
              href="/articles/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              新規記事作成
            </Link>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-xl border border-gray-200">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  最初の記事を作成しましょう
                </h3>
                <p className="text-gray-600 mb-6">
                  あなたの知識や経験を共有することから始めてみませんか？
                </p>
                <Link
                  href="/articles/new"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                >
                  記事を書く
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <ArticleList articles={articles} />
          )}
        </div>
      </div>
    </main>
  );
}
