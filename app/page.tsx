'use client';
import DetailImage from 'components/liquor/detail/DetailImage';
import DetailInfo from 'components/liquor/detail/DetailInfo';
import DetailSnack from 'components/liquor/detail/DetailSnack';
import SortDropDown from 'components/liquor/search/SortDropDown';
import LiquorCard from 'components/shared/LiquorCard';
import Tag from 'components/shared/Tag';

export default function Home() {
  return (
    <main className="flex flex-col gap-4 p-5">
      <>
        <DetailImage name={'liquor.name'} imgUrl={'liquor.liquorPictureUrl'} />
        <DetailInfo
          name={'iquor.name'}
          detailAbv={0.5}
          explanation={'liquor.detailExplanation'}
          tags={['newTags']}
        />
        <div className="w-full h-2.5 bg-suldak-gray-200" />
        <div className="w-full h-2.5 bg-suldak-gray-200" />
      </>
    </main>
  );
}
