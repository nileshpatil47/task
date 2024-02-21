import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import TaskNotFound from './TaskNotFound';

const Task = ({ tasks, onDelete }) => {
  const { id } = useParams();
  const task = tasks.find((e) => e.id === Number(id));
  console.log(task)
  if (!task) return <EventNotFound />;

  return (
    <div className="eventContainer">
      <h2>
        {task.title}
        {' - '}
        {task.status}
        <Link to={`/tasks/${task.id}/edit`}>Edit</Link>
        <button
          className="delete"
          type="button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>Status:</strong> {task.status}
        </li>
        <li>
          <strong>Due Date:</strong> {task.due_date}
        </li>
        <li>
          <strong>Title:</strong> {task.title}
        </li>
        <li>
          <strong>Description:</strong> {task.description}
        </li>
      </ul>
    </div>
  );
};

Task.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      due_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
