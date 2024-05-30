import React from 'react';
import { useMutation } from '@apollo/client';
import { graphql } from '../../graphql/types';
import { Task } from '../../graphql/types/graphql';
import { Navigate } from 'react-router';
import { NavLink } from 'react-router-dom';

const REMOVE_TASK = graphql(`
  mutation RemoveTask($id: ID!) {
    taskDelete(input: { id: $id }) {
      task {
        id
      }
    }
  }
`);

export interface RemoveTaskProps {
  navigateDestination?: string;
  cancelDestination?: string;
  task: Task;
};

export default function RemoveTask({ navigateDestination, cancelDestination = '..', task }: RemoveTaskProps) {
  const [removeTask, { error, data }] = useMutation(REMOVE_TASK, { refetchQueries: ['GetTasks'], variables: { id: task.id }});
  const shouldNavigateOnDelete = typeof navigateDestination !== 'undefined';
  const willNavigate = shouldNavigateOnDelete && data && typeof error === 'undefined';

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      try {
        await removeTask();
      } catch (error) {
        console.error(error);
      }
    }}>
      {willNavigate && (
        <>
          <p>Task removed! Navigating...</p>
          <Navigate replace to={navigateDestination} />
        </>
      )}

      <label>
        Are you sure you want to remove the task: <i>{task.title}</i>

        <div>
          <button type="submit">Yes</button>
          <NavLink end to={cancelDestination}>Cancel</NavLink>
        </div>
      </label>



      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
