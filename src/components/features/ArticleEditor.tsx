// src/components/features/ArticleEditor.tsx
"use client";

import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/articles";
import { Editor } from "@tinymce/tinymce-react";

export default function ArticleEditor() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    createArticle(title, content);
    router.push("/");
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">記事エディタ</h1>
      </div>

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

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">エディタ</h2>
          <Editor
            apiKey="r5wtmw77haw5u5svq8xh4yg5aputxgx6giepz8a4eg48yuir"
            value={content}
            onEditorChange={(newValue: SetStateAction<string>) =>
              setContent(newValue)
            }
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "markdown",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | link image | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              // 日本語設定を無効化
              // language: "ja",
              // language_url: "/langs/ja.js",
              markdown: {
                enabled: true, // markdownプラグインを有効化
              },
            }}
          />
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
    </div>
  );
}
