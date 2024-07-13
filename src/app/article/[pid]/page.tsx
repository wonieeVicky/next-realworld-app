import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';

import ArticleAPI from '@/lib/api/article';
import ArticleMeta from '@/components/article/ArticleMeta';

type Props = {
  params: {
    pid: string;
  };
};

export default async function ArticlePage({ params: { pid } }: Props) {
  const {
    data: { article }
  } = await ArticleAPI.get(pid);

  if (!article) {
    notFound();
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>
          <ArticleMeta article={article} />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params: { pid }
}: Props): Promise<Metadata> {
  const article = await ArticleAPI.get(pid);

  if (!article) {
    notFound();
  }

  return {
    title: article.data.article.title,
    description: article.data.article.description
  };
}
