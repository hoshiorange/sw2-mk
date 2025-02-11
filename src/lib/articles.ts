// 記事の型定義
export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// メモリ上でデータを保持するための配列
let articles: Article[] = [
  {
    id: "1",
    title: "サンプル記事",
    content: "これはサンプル記事です。",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// 全記事の取得
export const getArticles = (): Article[] => {
  return articles;
};

// 特定の記事を取得
export const getArticleById = (id: string): Article | undefined => {
  return articles.find((article) => article.id === id);
};

// 記事の作成
export const createArticle = (title: string, content: string): Article => {
  const newArticle: Article = {
    id: (articles.length + 1).toString(), // 簡易的なID生成
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  articles = [...articles, newArticle];
  return newArticle;
};

// 記事の更新（オプショナル - 後で必要になった時用）
export const updateArticle = (
  id: string,
  title: string,
  content: string
): Article | null => {
  const index = articles.findIndex((article) => article.id === id);
  if (index === -1) return null;

  const updatedArticle: Article = {
    ...articles[index],
    title,
    content,
    updatedAt: new Date().toISOString(),
  };

  articles = [
    ...articles.slice(0, index),
    updatedArticle,
    ...articles.slice(index + 1),
  ];

  return updatedArticle;
};
