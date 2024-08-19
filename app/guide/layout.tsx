import { PropsWithChildren, ReactNode } from 'react';

import { getMetadata } from 'lib/getMetadata';

export async function generateMetadata() {
  return getMetadata({
    title: '술닥술닥',
  });
}

export default function GuideLayout({
  children,
}: PropsWithChildren<ReactNode>) {
  return <>{children}</>;
}
