import { Metadata } from 'next';

import { META } from '../constant/metadata';

export const getMetadata = (metadataProps?: Metadata) => {
  const { title, description, openGraph } = metadataProps || {};

  const TITLE = title ? `${title}` : META.title;
  const DESCRIPTION = description || META.description;
  const OG_IMAGE = openGraph?.images || META.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META.url),

    // 다른 URL에서 동일한 페이지에 접근이 가능할때 주요 콘텐츠임을 검색엔진에 알려주는 요소
    alternates: {
      canonical: '',
    },

    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: TITLE,
      locale: 'ko-KR', // 현재로서는 한글만 지원
      type: 'website',
      images: OG_IMAGE,
    },
    // !TODO 사이트 등록 후 추가 예정
    verification: {
      // google: '',
      // other: {},
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: OG_IMAGE,
    },
  };

  return metadata;
};
