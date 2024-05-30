import React, {
  useRef, useState,
} from 'react';
import { graphql } from '../../graphql/types';
import { useMutation } from '@apollo/client';

const CREATE_NEW_TASK = graphql(`
mutation CreateNewTask($title: String!, $description: String!, $dueDate: ISO8601Date) {
  taskCreate(input: {taskInput: { title: $title, description: $description, dueDate: $dueDate }}) {
    task {
      id
      title
      description
      completed
      dueDate
    }
  }
}
  `);

export interface CreateTaskProps {
  requireDueDate?: boolean;
  };

export default function CreateTask({ requireDueDate = false } : CreateTaskProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const [createTask, { error }] = useMutation(CREATE_NEW_TASK, { refetchQueries: ['GetTasks'] });
  const [toggleDueDate, setToggleDueDate] = useState(false);

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      try {
        await createTask({
          variables: {
            title: titleRef.current!.value,
            description: descriptionRef.current!.value,
            ...dueDateRef.current!.value ? { dueDate: dueDateRef.current!.value } : {},
          },
        });
        titleRef.current!.value = '';
        descriptionRef.current!.value = '';
        dueDateRef.current!.value = '';
      } catch (error) {
        console.error(error);
      }
    }}>
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
