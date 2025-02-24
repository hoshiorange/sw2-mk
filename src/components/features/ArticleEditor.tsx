// src/components/features/ArticleEditor.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/articles";
import dynamic from "next/dynamic";
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";

// MDEditorの動的インポート
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

// ByteMDのプラグイン設定
const plugins = [gfm(), highlight()];

export default function ArticleEditor() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content1, setContent1] = useState(""); // ByteMD用
  const [content2, setContent2] = useState(""); // MDEditor用
  const [selectedEditor, setSelectedEditor] = useState<
    "bytemd" | "mdeditor" | "both"
  >("both");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = selectedEditor === "bytemd" ? content1 : content2;
    if (!title || !content) return;
    createArticle(title, content);
    router.push("/");
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">マークダウンエディタ比較</h1>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setSelectedEditor("bytemd")}
            className={`px-4 py-2 rounded ${
              selectedEditor === "bytemd"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            ByteMD
          </button>
          <button
            onClick={() => setSelectedEditor("mdeditor")}
            className={`px-4 py-2 rounded ${
              selectedEditor === "mdeditor"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            React MD Editor
          </button>
          <button
            onClick={() => setSelectedEditor("both")}
            className={`px-4 py-2 rounded ${
              selectedEditor === "both"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            両方表示
          </button>
        </div>
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

        {(selectedEditor === "bytemd" || selectedEditor === "both") && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">ByteMD エディタ</h2>
            <Editor
              value={content1}
              plugins={plugins}
              onChange={(v) => setContent1(v)}
              locale={{
                write: "編集",
                preview: "プレビュー",
                writeMode: "編集モード",
                previewMode: "プレビューモード",
                loading: "読み込み中",
                error: "エラーが発生しました",
              }}
            />
          </div>
        )}

        {(selectedEditor === "mdeditor" || selectedEditor === "both") && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">React MD Editor</h2>
            <div data-color-mode="light">
              <MDEditor
                value={content2}
                onChange={(val) => setContent2(val || "")}
                height={400}
                preview="edit"
              />
            </div>
          </div>
        )}

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
