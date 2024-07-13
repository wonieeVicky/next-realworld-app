'use client';

import DOMPurify from 'dompurify';
import { marked } from 'marked';
import React from 'react';

const ArticleDescription = ({ article }) => {
  const markup = {
    __html: marked(DOMPurify.sanitize(article.body)) as string
  };

  return (
    <>
      <div dangerouslySetInnerHTML={markup} />
    </>
  );
};

export default ArticleDescription;
