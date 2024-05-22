import React from 'react';

type Props = {
  test: boolean;
  children: React.ReactNode;
};

const Maybe = ({ test, children }: Props) => <>{test && children}</>;

export default Maybe;
