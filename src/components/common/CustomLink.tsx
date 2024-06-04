import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
  as: string;
  className?: string;
  children: React.ReactNode;
};

const CustomLink = ({ className, href, as, children }: Props) => (
  <Link href={href} as={as} className={className || ''} passHref>
    {children}
  </Link>
);

export default CustomLink;
