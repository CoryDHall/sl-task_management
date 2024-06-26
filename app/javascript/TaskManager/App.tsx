import React from 'react';
import AllTasks from './views/AllTasks';
import CreateTask from './views/CreateTask';
import {
  Route, Routes,
} from 'react-router';
import { composePage } from './components/page';
import { NavLink } from 'react-router-dom';
import TaskItem from './view-controllers/TaskItem';

const AllTasksPage = composePage('Tasks', AllTasks);
const NewTaskPage = composePage('New Task', CreateTask);
const TaskItemPages = composePage('Task', TaskItem);

export default function App() {
  return (
    <main>
      <h1>Task Manager</h1>

      <nav>
        <ul>
          <li>
            <NavLink to="/">All Tasks</NavLink>
          </li>

          <li>
            <NavLink to="/new">New Task</NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<AllTasksPage />}
        />

        <Route
          path="/new"
          element={<NewTaskPage navigateDestination="/" />}
        />

        <Route
          path="/task/:id/*"
          element={<TaskItemPages />}
        />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>

    </main>
  );
}
