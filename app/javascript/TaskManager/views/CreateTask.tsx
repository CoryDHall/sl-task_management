import React, {
  useRef, useState,
} from 'react';
import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router';
import { GET_TASKS } from '../graphql/queries';
import { CREATE_NEW_TASK } from '../graphql/mutations';
import { iViewProps } from '../common/viewProps';

export interface CreateTaskProps extends iViewProps {
  requireDueDate?: boolean;
};

export default function CreateTask({ requireDueDate = false, navigateDestination } : CreateTaskProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const [createTask, { error, data }] = useMutation(CREATE_NEW_TASK, {
    update(cache, { data: { taskCreate }}) {
      const { tasks } = cache.readQuery({ query: GET_TASKS });
      cache.writeQuery({
        query: GET_TASKS,
        data: { tasks: tasks.concat([taskCreate.task]) },
      });
    },
  });
  const [toggleDueDate, setToggleDueDate] = useState(false);
  const shouldNavigateOnCreate = typeof navigateDestination !== 'undefined';
  const willNavigate = shouldNavigateOnCreate && data && typeof error === 'undefined';

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      try {
        await createTask({
          variables: {
            title: titleRef.current!.value,
            description: descriptionRef.current!.value,
            ...((requireDueDate || toggleDueDate) && dueDateRef.current!.value) ? { dueDate: dueDateRef.current!.value } : {},
          },
        });
        titleRef.current!.value = '';
        descriptionRef.current!.value = '';
        if (dueDateRef.current) dueDateRef.current.value = '';
      } catch (error) {
        console.error(error);
      }
    }}>
      {willNavigate && (
        <>
          <p>Task created! Navigating...</p>
          <Navigate to={navigateDestination} />
        </>
      )}

      <label>
        Title:
        <input required type="text" ref={titleRef} />
      </label>

      <label>
        Description:
        <textarea ref={descriptionRef} />
      </label>

      {(!requireDueDate && !toggleDueDate) && (
        <button type="button" onClick={() => setToggleDueDate(true)}> Add Due Date? </button>
      )}

      {(requireDueDate || toggleDueDate) && (
        <>
          <label>
            Due Date:
            <input required type="date" ref={dueDateRef} />
          </label>

          {toggleDueDate && (
            <button type="button" onClick={() => setToggleDueDate(false)}> Remove Due Date </button>
          )}
        </>
      )}

      <button type="submit">Create Task</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
