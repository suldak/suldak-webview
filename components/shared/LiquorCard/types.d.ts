import { LiquorSell, LiquorSnack } from "models/liquor";
export interface CardProps {
  imgUrl: string; // 술 사진 이미지 주소
  liquorId: number;
  liquorDetail: string; // 술 설명
  liquorAbv: number | string; // 술 도수
  name: string;
  liquorSellDtos: LiquorSell[]; // 술 판매처 목록
  liquorSnackRes: LiquorSnack[]; // 술 안주 목록
  tasteTypeDtos: TasteType[]; // 술 맛
}
export interface LiquorTagProps {
  name: string;
  key: number | string;
}
// window 객체에 대한 타입 선언 확장
declare global {
  interface Window {
    FlutterBridge?: {
      postMessage(message: string): void;
    };
  }
}
