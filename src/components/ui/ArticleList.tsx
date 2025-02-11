// src/components/ui/ArticleList.tsx
import Link from "next/link";
import { Article } from "@/lib/articles";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link href={`/articles/${article.id}`} key={article.id}>
          <article className="group h-full p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-500">
                  {/* {new Date(article.createdAt).toLocaleDateString("ja-JP")} */}
                  <div className="text-sm text-gray-500">
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
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h2>

              <p className="text-gray-600 mb-4 flex-grow">
                {article.content.slice(0, 100)}
                {article.content.length > 100 ? "..." : ""}
              </p>

              <div className="flex items-center text-sm text-gray-500 mt-auto">
                <span className="inline-flex items-center">
                  続きを読む
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
