import { ComponentPropsWithoutRef } from 'react';

type TagColor = 'gray' | 'blue';

/**
 * 태그 인터페이스
 */
interface TagProps extends ComponentPropsWithoutRef<'div'> {
  tagId: number;
  onClick?: (tagId: number) => void;
  tagColor?: TagColor;
  selected?: boolean;
  children?: React.ReactNode;
}

/**
 * 클릭 이벤트가 있는 태그 인터페이스
 */
// interface ClickAbleTagProps extends TagProps {}
