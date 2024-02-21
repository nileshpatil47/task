json.extract! task, :id, :title, :description, :status, :due_date, :created_at, :updated_at
json.url api_v1_task_url(task, format: :json)
