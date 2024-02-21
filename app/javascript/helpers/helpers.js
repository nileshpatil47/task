import { error } from './notifications';

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const isValidDate = (dateObj) => !Number.isNaN(Date.parse(dateObj));

export const validateTask = (task) => {
  const errors = {};

  if (task.due_date === '') {
    errors.due_date = 'You must enter a valid date';
  }

  if (task.title === '') {
    errors.title = 'You must enter a title';
  }

  if (task.description === '') {
    errors.description = 'You must enter valid description';
  }

  return errors;
};

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.error(err);
};
