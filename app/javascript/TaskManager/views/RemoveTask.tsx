import React from 'react';
import { useMutation } from '@apollo/client';
import { Task } from '../../graphql/types/graphql';
import { Navigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { GET_TASKS } from '../graphql/queries';
import { REMOVE_TASK } from '../graphql/mutations';
import {
  iTaskViewProps, iViewProps, 
} from '../common/viewProps';


export interface RemoveTaskProps extends iViewProps, iTaskViewProps {
};

export default function RemoveTask({ navigateDestination, cancelDestination = '..', task }: RemoveTaskProps) {
  const [removeTask, { error, data }] = useMutation(REMOVE_TASK, {
    variables: { id: task.id },
    update(cache, { data: { taskDelete }}) {
      const { tasks } = cache.readQuery({ query: GET_TASKS });
      cache.writeQuery({
        query: GET_TASKS,
        data: { tasks: tasks.filter((task: Task) => task.id !== taskDelete.task.id) },
      });
    },
  });
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
