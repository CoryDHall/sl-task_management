import React from 'react';
import { useMutation } from '@apollo/client';
import TaskView from '../components/TaskView';
import {
  MARK_TASK_COMPLETED, MARK_TASK_INCOMPLETE,
} from '../graphql/mutations';
import { iTaskViewProps } from '../common/viewProps';


export interface ShowTaskProps extends iTaskViewProps {
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
