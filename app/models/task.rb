class Task < ApplicationRecord
  # ---------------------------------- Scopes ---------------------------------- #
  # completed tasks
  scope :completed, -> { where(completed: true) }
  # incomplete tasks
  scope :incomplete, -> { where(completed: false) }
  # tasks that have a due date
  scope :time_dependent, -> { where.not(due_date: nil) }
  # open-ended tasks without a due date
  scope :time_independent, -> { where(due_date: nil) }

  # tasks due after a certain date
  scope :due_after, ->(date) { where('due_date > ?', date) }
  # tasks due before a certain date
  scope :due_before, ->(date) { where('due_date < ?', date) }

  # tasks which are past due
  scope :past_due, -> { incomplete.due_before(Date.today) }

  def self.CreateTodo!(title:, description: "")
    Task.create!(title: title, description: description, completed: false, due_date: nil)
  end

  def self.CreateLog!(title:, description: "", date: nil)
    Task.create!(title: title, description: description, completed: true, due_date: date)
  end

  def self.CreateReminder!(due_date:, title:, description: "")
    Task.create!(title: title, description: description, completed: false, due_date: due_date)
  end

  # -------------------------------- Validations ------------------------------- #
  validates :title, presence: true
  validates :completed, inclusion: [true, false]

  # ---------------------------------- Methods -------------------------------- #
  def mark_complete
    self.completed = true
  end

  def mark_incomplete
    self.completed = false
  end

  def completed?
    completed
  end

  def incomplete?
    !completed
  end

  def set_due_date(date)
    self.due_date = date
  end

  def clear_due_date
    self.due_date = nil
  end

  def past_due?
    due_date.present? && due_date < Date.today
  end
end
