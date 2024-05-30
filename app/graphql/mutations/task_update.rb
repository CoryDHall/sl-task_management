# frozen_string_literal: true

module Mutations
  class TaskUpdate < BaseMutation
    description "Updates a task by id"

    field :task, Types::TaskType, null: false

    argument :id, ID, required: true
    argument :task_input, Types::TaskInputType, required: true

    def resolve(id:, task_input:)
      task = ::Task.find(id)
      fields = task_input.to_h
      if task_input[:remove_due_date]
        fields[:due_date] = nil
        fields.delete(:remove_due_date)
      end
      raise GraphQL::ExecutionError.new "Error updating task", extensions: task.errors.to_hash unless task.update(**fields)

      { task: task }
    end
  end
end
