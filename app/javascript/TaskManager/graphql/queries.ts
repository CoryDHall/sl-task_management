import { graphql } from '../../graphql/types';

export const GET_TASKS = graphql(`
  query GetTasks {
    tasks {
      id
      title
      description
      completed
      dueDate
    }
  }
`);

export const FIND_TASK = graphql(`
  query FindTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      completed
      dueDate
    }
  }
`);
