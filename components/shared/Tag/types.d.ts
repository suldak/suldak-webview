import { ComponentPropsWithoutRef } from 'react';

type TagType = 'gray' | 'blue' | 'selected';

/**
 * 태그 인터페이스
 */
interface TagProps extends ComponentPropsWithoutRef<'div'> {
  tagId: number;
  onClick?: (tagId: number) => void;
  tagType?: TagType;
  selected?: boolean;
  children?: React.ReactNode;
}

/**
 * 클릭 이벤트가 있는 태그 인터페이스
 */
// interface ClickAbleTagProps extends TagProps {}
