import React from 'react';
import { useMutation } from '@apollo/client';
import { Task } from '../../graphql/types/graphql';
import TaskView from '../components/TaskView';
import {
  MARK_TASK_COMPLETED, MARK_TASK_INCOMPLETE, 
} from '../graphql/mutations';


export interface ShowTaskProps {
  task: Task;

  allowMarkIncomplete?: boolean;
};

export default function ShowTask({ task, allowMarkIncomplete = false }: ShowTaskProps) {
  const [markTaskCompleted] = useMutation(MARK_TASK_COMPLETED, { variables: { id: task.id }});
  const [markTaskIncomplete] = useMutation(MARK_TASK_INCOMPLETE, { variables: { id: task.id }});

  return (
    <div>
      <div>
        {task.completed ? (
          allowMarkIncomplete && (
            <button onClick={() => markTaskIncomplete()}>Mark Incomplete</button>
          )
        ) : (
          <button onClick={() => markTaskCompleted()}>Mark Completed</button>
        )}
      </div>

      <TaskView task={task} />
    </div>
  );
}
