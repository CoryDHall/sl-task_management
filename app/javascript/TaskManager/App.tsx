import React from 'react';
import AllTasks from './views/AllTasks';
import CreateTask from './views/CreateTask';
export default function App() {
  return (
    <main>
      <h1>Task Manager</h1>

      <section>
        <h2>Create Task</h2>
        <CreateTask />
      </section>

      <section>
        <h2>Tasks</h2>
        <AllTasks />
      </section>

    </main>
  );
}
