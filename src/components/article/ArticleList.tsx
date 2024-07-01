'use client';

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

import ArticlePreview from './ArticlePreview';
import Maybe from '../common/Maybe';
import { usePageState } from '../../lib/context/PageContext';
import {
  usePageCountState,
  usePageCountDispatch
} from '../../lib/context/PageCountContext';
import ErrorMessage from '../common/ErrorMessage';
import Pagination from '../common/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import useViewport from '@/lib/hooks/useViewport';
import { DEFAULT_LIMIT, SERVER_BASE_URL } from '@/lib/utils/contants';
import fetcher from '@/lib/utils/fetcher';

const ArticleList = () => {
  const page = usePageState() || 0;
  const pageCount = usePageCountState();
  const setPageCount = usePageCountDispatch();
  if (!pageCount || !setPageCount) {
    return <></>;
  }

  const lastIndex =
    pageCount > 480 ? Math.ceil(pageCount / 20) : Math.ceil(pageCount / 20) - 1;
  const { vw } = useViewport();
  const pathname = usePathname();
  const search = useSearchParams();
  const favorite = search.get('favorite');
  const follow = search.get('follow');
  const tag = search.get('tag');
  const pid = search.get('pid');

  const isProfilePage = pathname.startsWith(`/profile`);

  let fetchURL = `${SERVER_BASE_URL}/articles?offset=${page * DEFAULT_LIMIT}`;

  switch (true) {
    case !!tag:
      fetchURL = `${SERVER_BASE_URL}/articles${pathname}&offset=${
        page * DEFAULT_LIMIT
      }`;
      break;
    case isProfilePage && !!favorite:
      fetchURL = `${SERVER_BASE_URL}/articles?favorited=${encodeURIComponent(
        String(pid)
      )}&offset=${page * DEFAULT_LIMIT}`;
      break;
    case isProfilePage && !favorite:
      fetchURL = `${SERVER_BASE_URL}/articles?author=${encodeURIComponent(
        String(pid)
      )}&offset=${page * DEFAULT_LIMIT}`;
      break;
    case !isProfilePage && !!follow:
      fetchURL = `${SERVER_BASE_URL}/articles/feed?offset=${
        page * DEFAULT_LIMIT
      }`;
      break;
    default:
      break;
  }

  const { data, error } = useSWR(fetchURL, fetcher);

  if (error) {
    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active"></ul>
        </div>
        <ErrorMessage message="Cannot load recent articles..." />
      </div>
    );
  }

  if (!data) return <LoadingSpinner />;

  const { articles, articlesCount } = data;
  setPageCount(articlesCount);

  if (articles && articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <>
      {articles?.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}

      <Maybe test={articlesCount && articlesCount > 20}>
        <Pagination
          total={pageCount}
          limit={20}
          pageCount={vw >= 768 ? 10 : 5}
          currentPage={page}
          lastIndex={lastIndex}
          fetchURL={fetchURL}
        />
      </Maybe>
    </>
  );
};

export default ArticleList;
