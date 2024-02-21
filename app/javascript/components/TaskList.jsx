import React from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ tasks }) => {
  const renderTasks = (taskArray) => {
    taskArray.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));

    return taskArray.map((task) => (
      <li key={task.id}>
        {task.title}
        {' - '}
        {task.status}
      </li>
    ));
  };

  return (
    <section>
      <h2>Tasks</h2>
      <ul>{renderTasks(tasks)}</ul>
    </section>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    due_date: PropTypes.string
  })).isRequired,
};

export default TaskList;