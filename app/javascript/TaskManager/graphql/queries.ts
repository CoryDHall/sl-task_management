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
