import ArticleEditor from "@/components/features/ArticleEditor";

export default function NewArticlePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">新規記事作成</h1>
        <ArticleEditor />
      </div>
    </main>
  );
}
