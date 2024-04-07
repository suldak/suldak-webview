interface Liquor {
  createdAt: string;
  detailAbv: number;
  detailExplanation: string;
  drinkingCapacityDto: {
    color: string;
    id: number;
    name: string;
  };
  id: number;
  isLike: boolean;
  liquorAbvDto: {
    id: number;
    name: string;
  };
  liquorDetailDto: {
    id: number;
    name: string;
  };
  liquorMaterialDtos: [
    {
      id: number;
      name: string;
    }
  ];
  liquorNameDto: {
    id: number;
    name: string;
  };
  liquorPictureUrl: string;
  liquorRecipe: string;
  liquorSellDtos: [
    {
      id: number;
      name: string;
    }
  ];
  liquorSnackRes: [
    {
      fileBaseNm: string;
      id: number;
      name: string;
    }
  ];
  modifiedAt: string;
  name: string;
  stateTypeDtos: [
    {
      id: number;
      name: string;
    }
  ];
  summaryExplanation: string;
  tasteTypeDtos: [
    {
      id: number;
      name: string;
    }
  ];
}
