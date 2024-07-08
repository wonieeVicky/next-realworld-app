import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';

import fetcher from '@/lib/utils/fetcher';
import { SERVER_BASE_URL } from '@/lib/utils/contants';

import useSWR from 'swr';
import ArticleAPI from '@/lib/api/article';

type Props = {
  params: {
    pid: string;
  };
};

export default async function ArticlePage({ params: { pid } }: Props) {
  return <div className="article-page"></div>;
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
