import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const Task = ({ tasks }) => {
  const { id } = useParams();
  const event = tasks.find((e) => e.id === Number(id));

  return (
    <>
      <h2>
        {event.title}
      </h2>
      <ul>
        <li>
          <strong>Date:</strong> {event.due_date}
        </li>
        <li>
          <strong>Title:</strong> {event.title}
        </li>
        <li>
          <strong>Speaker:</strong> {event.description}
        </li>
        <li>
          <strong>Published:</strong> {event.status == 'Done' ? 'yes' : 'no'}
        </li>
      </ul>
    </>
  );
};

Task.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Task;