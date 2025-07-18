export interface Liquor {
  createdAt: string;
  detailAbv: number; // 술 상세 도수
  detailExplanation: string; // 술 상세 설명
  drinkingCapacityDto: unknown;
  id: number;
  isLike: boolean; // 즐겨찾기 설정 여부
  name: string; // 술 이름

  liquorAbvDto: {
    // 술 도수 키워드
    id: number;
    name: string;
  };

  liquorDetailDto: unknown;

  liquorMaterialList: string[]; // 술 재료 목록
  // liquorMaterialDtos: string[]; 백오피스 수정 후 문자열로 바뀔 예정입니다.

  liquorNameDto: {
    fileBaseNm: string;
    id: number;
    name: string;
  };

  liquorPictureUrl: string; // 술 사진 URL

  liquorRecipe: string[]; // 술 레시피

  // 술 판매처 목록
  liquorSellDtos: LiquorSell[];

  // 술 안주 목록
  liquorSnackRes: LiquorSnack[];

  modifiedAt: string;

  // 상태 목록
  stateTypeDtos: StateType[];

  summaryExplanation: string; // 술 요약 설명

  tasteTypeDtos: TasteType[];
}

export interface LiquorMaterial {
  id: number;
  name: string;
}

// 술 판매처
export interface LiquorSell {
  id: number;
  name: string;
}

// 술 안주
export interface LiquorSnack {
  fileBaseNm: string;
  id: number;
  name: string;
}

// 상태 (어떨때 마시는 술인지)
interface StateType {
  id: number;
  name: string;
}

// 술 맛
export interface TasteType {
  id: number;
  name: string;
}

// 도수
export interface ABVType {
  id: number;
  name: string;
}

// 판매처
export interface SellerType {
  id: number;
  name: string;
}

// 검색 결과용 타입
export interface SearchLiquor {
  detailAbv: number;
  isLike: boolean;
  liquorId: number;
  liquorPictureUrl: string;
  name: string;
  summaryExplanation: string;
  tagList: SearchLiquorTag[];
}

export interface SearchLiquorTag {
  tagId: number;
  tagName: string;
}
