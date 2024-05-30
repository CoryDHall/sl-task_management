import React from 'react';
import { graphql } from '../../graphql/types';
import { useQuery } from '@apollo/client';
import TaskView from '../components/TaskView';
import {
  Route, Routes, useParams,
} from 'react-router';
import { NavLink } from 'react-router-dom';
import EditTask from './EditTask';
import RemoveTask from './RemoveTask';

const FIND_TASK = graphql(`
  query FindTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      completed
      dueDate
    }
  }`);


export default function ShowTask() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(FIND_TASK, { variables: { id }});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Routes>
        <Route index element={<TaskView task={data.task} />} />
        <Route path="edit" element={<EditTask task={data.task} navigateDestination=".." />} />
        <Route path="remove" element={<RemoveTask task={data.task} navigateDestination="/" />} />
      </Routes>

      <nav>
        <ul>
          <li>
            <NavLink to="./edit" >Edit</NavLink>
          </li>

          <li>
            <NavLink to="./remove" >Delete</NavLink>
          </li>

        </ul>
      </nav>
    </div>
  );
}
