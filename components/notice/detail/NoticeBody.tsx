import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

export default function NoticeBody({ markdown }: { markdown: string }) {
  const parsed = markdown
    .split("\n")
    .map((line) => {
      return /^\d+\.\s/.test(line) ? line : `- ${line}`; // 숫자 리스트가 아니면 강제로 리스트로
    })
    .join("\n");

  return (
    <section className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
      >
        {parsed}
      </ReactMarkdown>
    </section>
  );
}
