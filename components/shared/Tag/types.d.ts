import { ComponentPropsWithoutRef } from "react";

type TagColor = "gray" | "blue";

/**
 * 태그 인터페이스
 */
interface TagProps extends Omit<ComponentPropsWithoutRef<"span">, "onClick"> {
  tagId: number;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>, text: string) => void;
  tagColor?: TagColor;
  selected?: boolean;
}
/**
 * 클릭 이벤트가 있는 태그 인터페이스
 */
// interface ClickAbleTagProps extends TagProps {}
