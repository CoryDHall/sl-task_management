import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Route, Routes, useParams,
} from 'react-router';
import { NavLink } from 'react-router-dom';
import EditTask from '../views/EditTask';
import RemoveTask from '../views/RemoveTask';
import ShowTask from '../views/ShowTask';
import { FIND_TASK } from '../graphql/queries';


export default function TaskItem() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(FIND_TASK, { variables: { id }});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Routes>
        <Route index element={<ShowTask allowMarkIncomplete task={data.task} />} />
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
