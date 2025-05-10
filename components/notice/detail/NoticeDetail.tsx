import { useGetNoticeDetail } from "apis/notice/useGetNoticeDetail";
import NoticeBody from "./NoticeBody";

interface Props {
  id: number;
}

export default function NoticeDetail({ id }: Props) {
  const { data: notice } = useGetNoticeDetail(id);

  return (
    <article className="flex flex-col gap-5 p-5">
      <header className="flex flex-col gap-2 border-b-[1px] border-suldak-gray-400 pb-5">
        <h1 className="font-semibold leading-[22px] text-suldak-gray-900">
          {notice.title}
        </h1>
        <time dateTime={notice.createdAt}>{notice.createdAt}</time>
      </header>

      <NoticeBody markdown={notice.body} />
    </article>
  );
}
