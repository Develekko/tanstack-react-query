export interface Post {
  id:number;
  title:string;
  body:string;
  status:"published" | "draft" | "blocked";
  topRate:boolean;
}
export interface Comment {
  id:number;
  body:string;
  post_id:number;
}
export type PostStatusType = "published" | "draft" | "blocked" | "all";


export interface TopRatePost {
  postId: number;
  rateValue: boolean;
  pageNumber: number;
  search:string;
  filter:PostStatusType
}

export interface RemovePost {
  postId: number;
  pageNumber: number;
  search:string;
  filter:PostStatusType
}