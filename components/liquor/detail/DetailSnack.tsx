import SnackIcon from "assets/icons/ico-snack.svg";

import LiquorSnack from "components/liquor/detail/LiquorSnack";
import { LiquorSnack as LiquorSnackType } from "models/liquor";

interface DetailSnackProps {
  snacks: LiquorSnackType[];
}

/** 술 안주 컴포넌트 */
function DetailSnack({ snacks }: DetailSnackProps) {
  return (
    <section className="px-5 pb-50px pt-50px">
      <div className="flex items-center gap-1.5">
        <SnackIcon />
        <span className="text-lg font-bold text-suldak-gray-900">
          이런 안주와 어울려요
        </span>
      </div>
      <div className="mt-5 flex gap-3">
        {snacks.map((snack) => (
          <LiquorSnack key={snack.id} name={snack.name} />
        ))}
      </div>
    </section>
  );
}

export default DetailSnack;
