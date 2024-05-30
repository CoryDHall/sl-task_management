# Task Management

This is a simple task management system that allows a user to log and manage their daily tasks.

## Setup

1. Clone the repository
2. Navigate to the root directory
3. Initialize the project by running `bundle install`
4. If the database does not exist, run:
```bash
rake db:create
rake db:migrate
```
5. (Optional) Seed the database with sample data by running:
```bash
rake db:seed
```
6. Compile the assets by running `rake assets:precompile`
7. Start the server by running `rails s`


Notes
---

#### Backend Design

The data model only consists of one model, `Task`, so to avoid over-engineering, I avoided using a discrete service layer. There are some factory creation methods on the model to describe some latent use-cases for the application. The `graphql` gem provided generators for the GraphQL schema and resolvers, which I used to scaffold the API. The DSL for defining queries and mutations is somewhat verbose and because GraphQL requires tight coupling between the server and client, I opted to leave the API fairly generic and instead hoist descriptive behavioral logic to the client-side application.

#### Frontend Design

The client application is located within the `app/javascript` directory. It uses build tooling to, at design time, synchronise the backend API type data with its front-end consumption. The app doesn't require much local or derived state data, so it made more sense to avoid more robust state management and leave the response data untransformed within Apollo's `InMemoryCache`. For routing, the server loads the client for all `'*'` paths, and the client uses the `BrowserRouter` from `react-router` to manage navigation. In the absence of state-persistence, the interfaces for Task CRUD operations are exposed in discrete model views accessed by path. The Update operations are split into smaller more expressive mutations—one for updating the _details_ of a task regardless of its _completion_, and two small mutations for marking complete or incomplete. The thinking here is to ease future development and testing by separating feature implementation and integration while not being overly granular. The *update task details* operation exposed an issue with unsetting an optional field due to the different ways that `NULL` values are represented between ruby, javascript, and graphql. The solution chose here was to amend the `TaskInput` type with a boolean field `remove_due_date` which avoids contraining `due_date` value (and introducing clint/host time synchronization concerns) and avoids using a relaxed type union that could obscur otherwise simple input errors from typechecking.
