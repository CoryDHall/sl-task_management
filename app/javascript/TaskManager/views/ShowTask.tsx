import React from 'react';
import { useMutation } from '@apollo/client';
import { graphql } from '../../graphql/types';
import { Task } from '../../graphql/types/graphql';
import TaskView from '../components/TaskView';

const MARK_TASK_COMPLETED = graphql(`
  mutation MarkTaskCompleted($id: ID!) {
    taskUpdate(input: { id: $id, taskInput: { completed: true } }) {
      task {
        id
        completed
      }
    }
  }
`);

const MARK_TASK_INCOMPLETE = graphql(`
  mutation MarkTaskIncomplete($id: ID!) {
    taskUpdate(input: { id: $id, taskInput: { completed: false } }) {
      task {
        id
        completed
      }
    }
  }
`);

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
