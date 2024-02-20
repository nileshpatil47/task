class Task < ApplicationRecord
  enum status: %w[To\ Do In\ Progress Done]
end
