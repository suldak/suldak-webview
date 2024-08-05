export interface SearchText {
  id: number;
  userPrikey: number; //유저 프라이리키
  nickname: string; //유저 닉네임
  searchText: string; //검색어
  searchType: string; //검색타입(술,모임)
  searchAt: string; //검색 날짜
}
