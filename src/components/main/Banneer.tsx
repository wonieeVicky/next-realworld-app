﻿import { APP_NAME } from '@/lib/utils/contants';
import React from 'react';

const Banner = () => (
  <div className="banner">
    <div className="container">
      <h1 className="logo-font">{APP_NAME.toLowerCase()}</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
);

export default Banner;
