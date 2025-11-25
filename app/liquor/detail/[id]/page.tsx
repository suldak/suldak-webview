import dynamic from "next/dynamic";
import SplashScreen from "components/shared/SplashScreen";

const DetailPageClient = dynamic(() => import("./DetailPageClient"), {
  ssr: false,
  loading: () => <SplashScreen />,
});

interface Props {
  params: {
    id: string;
  };
}

export default function LiquorDetailPage({ params }: Props) {
  return <DetailPageClient id={params.id} />;
}
