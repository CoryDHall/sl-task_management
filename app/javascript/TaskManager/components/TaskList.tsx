import React from 'react';
import { Task } from '../types';
import TaskView from './TaskView';

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
