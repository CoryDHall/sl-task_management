require "graphql/rake_task"

GraphQL::RakeTask.new(
  schema_name: "SlTaskManagementSchema",
  directory: Rails.root.join("app", "javascript", "graphql"),
  dependencies: [:environment]
)
