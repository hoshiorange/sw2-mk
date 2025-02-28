"use client";

import Link from "next/link";
import { getArticleById } from "@/lib/articles";
import { use } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const article = getArticleById(id);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            記事が見つかりません
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            記事一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 inline-flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            記事一覧に戻る
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <div className="text-sm text-gray-500 mb-6">
            作成日時:{" "}
            {new Date(article.createdAt).toLocaleString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>

          <div className="prose prose-slate max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
            {/* {article.content.split("\n").map((line, index) => (
              <p key={index} className="mb-4">
                {line}
              </p>
            ))} */}
          </div>
        </article>
      </div>
    </main>
  );
}
