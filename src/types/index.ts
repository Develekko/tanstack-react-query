export interface DataItem {
  id: number;
  title: string;
  body: string;
  status: "publish" | "draft" | "block";
  topRate: boolean;
}

export type PostStatusType = "publish" | "draft" | "block" | "all";
