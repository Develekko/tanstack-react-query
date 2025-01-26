export type PostStatusType = "published" | "draft" | "block" | "all";

export interface DataItem {
  id: number;
  title: string;
  body: string;
  status: "published" | "draft" | "block";
  topRate: boolean;
}
