import { Review } from "./review";
import { Entity } from "./entity";

export interface Task extends Entity {
  title: string;
  columnId: string;
  creatorId: string;
  assigneeId?: string | null;
  storyPoints?: number;
  valuePoints?: number;
  leveragePoints?: number;
  subtasks?: Task[];
  reviews?: Review[];
  isEpic?: boolean;
  pullRequestURL?: string;
}
