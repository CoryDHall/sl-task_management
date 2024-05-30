
import { graphql } from '../../graphql/types';

export const MARK_TASK_COMPLETED = graphql(`
  mutation MarkTaskCompleted($id: ID!) {
    taskUpdate(input: { id: $id, taskInput: { completed: true } }) {
      task {
        id
        completed
      }
    }
  }
`);

export const MARK_TASK_INCOMPLETE = graphql(`
  mutation MarkTaskIncomplete($id: ID!) {
    taskUpdate(input: { id: $id, taskInput: { completed: false } }) {
      task {
        id
        completed
      }
    }
  }
`);

export const CREATE_NEW_TASK = graphql(`
  mutation CreateNewTask($title: String!, $description: String!, $dueDate: ISO8601Date) {
    taskCreate(input: {taskInput: { title: $title, description: $description, dueDate: $dueDate }}) {
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

export const REMOVE_TASK = graphql(`
  mutation RemoveTask($id: ID!) {
    taskDelete(input: { id: $id }) {
      task {
        id
      }
    }
  }
`);

export const UPDATE_TASK = graphql(`
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
