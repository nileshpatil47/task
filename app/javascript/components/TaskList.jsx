import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const TaskList = ({ tasks }) => {
  const renderTasks = (taskArray) =>
    taskArray
      .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
      .map((task) => (
        <li key={task.id}>
          <NavLink to={`/tasks/${task.id}`}>
            {task.title}
            {' - '}
            {task.status}
          </NavLink>
        </li>
      ));

  return (
    <section className="taskList">
      <h2>
        Tasks
        <Link to="/tasks/new">New Task</Link>
      </h2>

      <ul>{renderTasks(tasks)}</ul>
    </section>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      due_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default TaskList;
