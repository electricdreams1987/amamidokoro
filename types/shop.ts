export type ConfirmationStatus =
  | "公式確認済み"
  | "施設公式確認済み"
  | "第三者確認済み"
  | "記事確認済み"
  | "閉店確認済み"
  | "要追加確認";

export type ImageSourceType =
  | "公式画像候補"
  | "施設公式画像候補"
  | "自前撮影推奨"
  | "素材画像可"
  | "プレースホルダー";

export type ImageAcquireStatus =
  | "許諾確認待ち"
  | "撮影待ち"
  | "素材選定待ち"
  | "画像未取得"
  | "取得済み";

export type Shop = {
  id: number;
  name: string;
  area: string;
  nearest: string;
  signature: string;
  tags: string[];
  mood: string;
  feature: string;
  confirmationStatus: ConfirmationStatus;
  businessHours: string;
  regularHoliday: string;
  sourceUrl: string;
  mapUrl: string;
  lat: number;
  lng: number;
  imageUrl: string | null;
  imageAlt: string;
  imageCredit: string;
  imageSourceUrl: string;
  imageSourceType: ImageSourceType;
  imageAcquireStatus: ImageAcquireStatus;
  imageUsagePlan: string;
  imageWanted: string;
};
