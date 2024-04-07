import Link from 'next/link';

export default function Layout({
  filter,
  children,
}: {
  filter: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>
        <Link href="/filter">Open modal</Link>
      </nav>
      <div>{filter}</div>
      <div>{children}</div>
    </>
  );
}
