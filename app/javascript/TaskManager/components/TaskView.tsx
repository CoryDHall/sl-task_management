import React from 'react';
import { Task } from '../../graphql/types/graphql';

export interface TaskViewProps {
  task: Task;
};

export default function TaskView({ task }: TaskViewProps) {
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
      <p>{task.dueDate}</p>
    </div>
  );
}
