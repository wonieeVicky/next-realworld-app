'use client';

import React from 'react';
import useSWR, { mutate } from 'swr';

import CustomLink from '../common/CustomLink';
import checkLogin from '../../lib/utils/checkLogin';
import ArticleAPI from '../../lib/api/article';
import storage from '../../lib/utils/storage';
import Maybe from '../common/Maybe';
import { useParams, useRouter } from 'next/navigation';
import { SERVER_BASE_URL } from '@/lib/utils/contants';

const ArticleActions = ({ article }) => {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const router = useRouter();
  const { pid } = useParams();

  const handleDelete = async () => {
    if (!isLoggedIn) return;

    const result = window.confirm('Do you really want to delete it?');

    if (!result) return;

    await ArticleAPI.delete(pid, currentUser?.token);
    mutate(`${SERVER_BASE_URL}/articles/${pid}`);
    router.push(`/`);
  };

  const canModify =
    isLoggedIn && currentUser?.username === article?.author?.username;

  return (
    <Maybe test={canModify}>
      <span>
        <CustomLink
          href="/editor/[pid]"
          as={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" /> Edit Article
        </CustomLink>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleDelete}
        >
          <i className="ion-trash-a" /> Delete Article
        </button>
      </span>
    </Maybe>
  );
};

export default ArticleActions;
