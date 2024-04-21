export interface CardProps {
  imgUrl: string; // 술 사진 이미지 주소
  liquorId: number;
  liquorDetail: string; // 술 설명
  liquorAbv: number | string; // 술 도수
  name: string;
}