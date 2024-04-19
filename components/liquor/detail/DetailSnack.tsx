import SnackIcon from 'assets/icons/ico-snack.svg';

import LiquorSnack from 'components/liquor-detail/liquor-snack';
import { LiquorSnack as LiquorSnackType } from 'models/liquor';

interface DetailSnackProps {
  snacks: LiquorSnackType[];
}

/** 술 안주 컴포넌트 */
function DetailSnack({ snacks }: DetailSnackProps) {
  return (
    <section className="pt-50px px-5 pb-50px">
      <div className="flex gap-1.5 items-center">
        <SnackIcon />
        <span className="text-suldak-gray-900 font-bold text-lg">
          이런 안주와 어울려요
        </span>
      </div>
      <div className="flex gap-3 mt-5">
        {snacks.map((snack) => (
          <LiquorSnack key={snack.id} name={snack.name} />
        ))}
      </div>
    </section>
  );
}

export default DetailSnack;
