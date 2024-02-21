import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Pikaday from 'pikaday';
import PropTypes from 'prop-types';
import TaskNotFound from './TaskNotFound';
import { formatDate, isEmptyObject, validateTask } from '../helpers/helpers';

import 'pikaday/css/pikaday.css';

const TaskForm = ({ tasks, onSave }) => {
  const { id } = useParams();

  const initialTaskState = useCallback(
    () => {
      const defaults = {
        status: '',
        due_date: '',
        title: '',
        description: '',
      };
      const currTask = id ? tasks.find((e) => e.id === Number(id)) : {};
      return { ...defaults, ...currTask }
    },
    [tasks, id]
  );

  const [task, setTask] = useState(initialTaskState);
  const [formErrors, setFormErrors] = useState({});
  const dateInput = useRef(null);

  const updateTask = (key, value) => {
    setTask((prevTask) => ({ ...prevTask, [key]: value }));
  };

  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateTask('due_date', formattedDate);
      },
    });

    return () => p.destroy();
  }, []);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    updateTask(name, value);
  };

  useEffect(() => {
    setTask(initialTaskState);
  }, [tasks, initialTaskState]);

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) return null;

    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateTask(task);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(task);
    }
  };

  const cancelURL = task.id ? `/tasks/${task.id}` : '/tasks';
  const title = task.id ? `${task.title} - ${task.title}` : 'New Task';

  if (id && !task.id) return <EventNotFound />;

  return (
    <div>
      <h2>{title}</h2>
      {renderErrors()}

      <form className="taskForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            <strong>Title:</strong>
            <textarea
              cols="30"
              rows="10"
              id="title"
              name="title"
              onChange={handleInputChange}
              value={task.title}
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
              <strong>Description:</strong>
              <textarea
                cols="30"
                rows="20"
                id="description"
                name="description"
                onChange={handleInputChange}
                value={task.description}
              />
            </label>
        </div>
        <div>
          <label htmlFor="due_date">
            <strong>Publish Date:</strong>
            <input
              type="text"
              id="due_date"
              name="due_date"
              ref={dateInput}
              autoComplete="off"
              value={task.due_date}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="status">
            <strong>Status:</strong>
            <select class="form-select" id="status" name="status" aria-label="Default select example" defaultValue={task.status} onChange={handleInputChange}>
              {['To Do', 'In Progress', 'Done'].map((value, index) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <Link to={cancelURL}>Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

TaskForm.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      due_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
};

TaskForm.defaultProps = {
  events: [],
};
