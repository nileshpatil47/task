class Task < ApplicationRecord
  enum status: %w[To\ Do In\ Progress Done]

  scope :visible, -> { where("due_date < ?", DateTime.now) }
end
