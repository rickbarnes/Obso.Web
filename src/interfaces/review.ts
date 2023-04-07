export interface Review {
  id: string;
  taskId: string;
  reviewerId: string;
  isApproved: boolean;
  isChangesRequested: boolean;
  notes: string;
}
