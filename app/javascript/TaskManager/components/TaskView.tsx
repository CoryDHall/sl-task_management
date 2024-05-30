import React from 'react';
import { Task } from '../../graphql/types/graphql';
import { NavLink } from 'react-router-dom';

export interface TaskViewProps {
  task: Task;
};

export default function TaskView({ task }: TaskViewProps) {
  return (
    <div className="task">
      <h3>
        <NavLink to={`/task/${task.id}`}>
          {task.title}
        </NavLink>
      </h3>

      <p>{task.description}</p>
      <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
      <p>{task.dueDate}</p>
    </div>
  );
}
