import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../graphql/queries';
import TaskList from '../components/TaskList';

export default function AllTasks() {
  const { data, error, loading } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <TaskList tasks={data.tasks} />
  );
}
