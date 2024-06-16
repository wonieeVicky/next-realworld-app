'use clinet';
import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  as: string;
  children: ReactNode;
}

const NavLink = ({ href, as, children }: NavLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      as={as}
      passHref
      className={`nav-link ${
        encodeURIComponent(pathname) === encodeURIComponent(as) && `active`
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
