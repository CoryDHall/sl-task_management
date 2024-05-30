import React, {
  useRef, useState,
} from 'react';
import { graphql } from '../../graphql/types';
import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router';
import { Task } from '../../graphql/types/graphql';
import { NavLink } from 'react-router-dom';

const UPDATE_TASK = graphql(`
mutation UpdateTask($id: ID!, $title: String, $description: String, $dueDate: ISO8601Date, $removeDueDate: Boolean) {
  taskUpdate(input: {id: $id, taskInput: { title: $title, description: $description, dueDate: $dueDate, removeDueDate: $removeDueDate}}) {
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

export interface EditTaskProps {
  navigateDestination?: string;
  task: Task;
};

export default function EditTask({ navigateDestination, task }: EditTaskProps) {
  const [updateTask, { error, data }] = useMutation(UPDATE_TASK, { refetchQueries: ['FindTask'] });
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [toggleDueDate, setToggleDueDate] = useState(task.dueDate !== null);
  const shouldNavigateOnCreate = typeof navigateDestination !== 'undefined';
  const willNavigate = shouldNavigateOnCreate && data && typeof error === 'undefined';

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      try {
        await updateTask({
          variables: {
            id: task.id,
            title: titleRef.current!.value,
            description: descriptionRef.current!.value,
            ...(toggleDueDate && dueDateRef.current!.value) ? { dueDate: dueDateRef.current!.value } : { removeDueDate: true },
          },
        });
        titleRef.current!.value = '';
        descriptionRef.current!.value = '';
        dueDateRef.current!.value = '';
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
        <input required type="text" ref={titleRef} defaultValue={task.title} />
      </label>

      <label>
        Description:
        <textarea ref={descriptionRef} defaultValue={task.description} />
      </label>

      {(!toggleDueDate) && (
        <button type="button" onClick={() => setToggleDueDate(true)}> Add Due Date? </button>
      )}

      {(toggleDueDate) && (
        <>
          <label>
            Due Date:
            <input required type="date" ref={dueDateRef} defaultValue={task.dueDate} />
          </label>

          {toggleDueDate && (
            <button type="button" onClick={() => setToggleDueDate(false)}> Remove Due Date </button>
          )}
        </>
      )}

      <button type="submit">Update Task</button>

      <div>
        <NavLink to={navigateDestination || '..'}>Back</NavLink>
      </div>

      {error && <p>Error: {error.message}</p>}
    </form>
  );
}