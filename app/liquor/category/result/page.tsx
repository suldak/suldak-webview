import dynamic from "next/dynamic";
import SplashScreen from "components/shared/SplashScreen";

const CategoryResultPageClient = dynamic(
  () => import("./CategoryResultPageClient"),
  {
    ssr: false,
    loading: () => <SplashScreen />,
  },
);

export default function LiquorCategoryResultPage() {
  return <CategoryResultPageClient />;
}
