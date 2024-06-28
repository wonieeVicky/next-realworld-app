'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

import CustomLink from '../common/CustomLink';
import Maybe from '../common/Maybe';
import NavLink from '../common/NavLink';
import checkLogin from '../../lib/utils/checkLogin';
import storage from '../../lib/utils/storage';

const TabList = () => {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');

  if (!isLoggedIn) {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink href="/" as="/">
            Global Feed
          </NavLink>
        </li>

        <Maybe test={!!tag}>
          <li className="nav-item">
            <CustomLink
              href={`/?tag=${tag}`}
              as={`/?tag=${tag}`}
              className="nav-link active"
            >
              <i className="ion-pound" /> {tag}
            </CustomLink>
          </li>
        </Maybe>
      </ul>
    );
  }

  return (
    <ul className="nav nav-pills outline-active">
      <li className="nav-item">
        <NavLink
          href={`/?follow=${currentUser?.username}`}
          as={`/?follow=${currentUser?.username}`}
        >
          Your Feed
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink href="/" as="/">
          Global Feed
        </NavLink>
      </li>

      <Maybe test={!!tag}>
        <li className="nav-item">
          <CustomLink
            href={`/?tag=${tag}`}
            as={`/?tag=${tag}`}
            className="nav-link active"
          >
            <i className="ion-pound" /> {tag}
          </CustomLink>
        </li>
      </Maybe>
    </ul>
  );
};

export default TabList;
