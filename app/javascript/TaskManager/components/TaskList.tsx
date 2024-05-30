import React from 'react';
import TaskView from './TaskView';
import { Task } from '../../graphql/types/graphql';

export interface TaskListProps {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <ul>
      {tasks.map(t => (
        <li key={t.id}><TaskView task={t} /></li>
      ))}
    </ul>
  );
}
