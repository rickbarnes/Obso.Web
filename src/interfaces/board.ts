export interface Board {
  id: string;
  name: string;
  backgroundType: number;
  backgroundColor?: string;
  backgroundImageUrl?: string;
  columnIds: string[];
  ownerId: string;
  userIds: string[];
}
