import QueryProvider from './QueryProvider';

interface Props {
  children?: React.ReactNode;
}

/**
 * 각종 Provider의 index 컴포넌트 입니다.
 * 해당 컴포넌트에서 각종 Provider를 합성합니다.
 * @param children 렌더링할 자식 요소
 * @returns
 */
const Provider = ({ children }: Props) => {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
};

export default Provider;
