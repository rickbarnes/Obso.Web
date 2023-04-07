import { Task } from "./task";

export type Rule = ({}: RulesRequest) => RuleResult;

export type RuleResult = {
  result: boolean;
  error: string | null;
};

export interface RulesRequest {
  currentTasksCount: number;
  maximumTasksCount: number;
  task: Task;
  maxStoryPoints: number;
  currentStoryPoints: number;
  currentTasks: Task[];
}
