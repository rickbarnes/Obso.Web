import { Rule, RuleResult } from "../interfaces/rule";
import { Task } from "../interfaces/task";

export const RestrictOneTaskPerUser: Rule = ({
  currentTasks,
  task,
}): RuleResult => {
  const result = !currentTasks.some((t) => t.assigneeId === task.assigneeId);
  return {
    result,
    error: result ? null : "Only one task per user",
  };
};

export const RestictNumberOfMaxTasks: Rule = ({
  currentTasksCount,
  maximumTasksCount,
}): RuleResult => {
  const result = currentTasksCount + 1 <= maximumTasksCount;
  return {
    result,
    error: result ? null : "Maximum tasks reached",
  };
};

export const RestrictNumberOfStoryPoints: Rule = ({
  task,
  maxStoryPoints,
  currentStoryPoints,
}: {
  task: Task;
  maxStoryPoints: number;
  currentStoryPoints: number;
}): RuleResult => {
  const result = currentStoryPoints + task.storyPoints < maxStoryPoints;
  return {
    result,
    error: result ? null : "Maximum story points reached",
  };
};

export const RestrictReviewedTasks: Rule = ({
  task,
}: {
  task: Task;
}): RuleResult => {
  const result = !task.reviews?.some((review) => review.isApproved);
  return {
    result,
    error: result ? null : "Task is not approved",
  };
};

export const RestrictEpicTasks: Rule = ({
  task,
}: {
  task: Task;
}): RuleResult => {
  const result = !task.isEpic;
  return {
    result,
    error: result ? null : "Non epic tasks are not allowed",
  };
};

export const RestrictPR = ({ task }: { task: Task }): RuleResult => {
  const result = !!task.pullRequestURL;
  return {
    result,
    error: result ? null : "Task has no pull request",
  };
};
