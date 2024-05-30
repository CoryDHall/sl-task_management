import { Task } from "../../graphql/types/graphql";

export interface iViewProps {
  navigateDestination?: string;

  cancelDestination?: string;
};

export interface iTaskViewProps {
  task: Task;
};
