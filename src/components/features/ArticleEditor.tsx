"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/articles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ArticleEditor() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    createArticle(title, content);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          タイトル
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="記事のタイトルを入力"
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            本文 (Markdown形式で入力できます)
          </label>
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {isPreview ? "編集に戻る" : "プレビュー"}
          </button>
        </div>

        {isPreview ? (
          <div className="prose prose-slate max-w-none p-4 border border-gray-300 rounded-md bg-gray-50 min-h-[200px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "プレビューする内容がありません"}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={10}
            placeholder="Markdown形式で記事を入力"
            required
          />
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          作成
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
