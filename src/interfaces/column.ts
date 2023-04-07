import { Rule } from "./rule";
import { Entity } from "./entity";

export interface Column extends Entity {
  header: string;
  taskIds: string[];
  isEditing: boolean;
  rules?: Rule[];
  maxStoryPoints?: number;
  maxTasks?: number;
}
