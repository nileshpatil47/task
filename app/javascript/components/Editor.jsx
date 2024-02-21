/* global window */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Task from './Task';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

const Editor = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/v1/tasks.json');
        if (!response.ok) throw Error(response.statusText);

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        handleAjaxError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addTask = async (newTask) => {
    try {
      const response = await window.fetch('/api/v1/tasks.json', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw Error(response.statusText);

      const savedTask = await response.json();
      const newTasks = [...tasks, savedTask];
      setTasks(newTasks);
      success('Task Added!');
      navigate(`/tasks/${savedTask.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const deleteTask = async (taskId) => {
    const sure = window.confirm('Are you sure?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/v1/tasks/${taskId}.json`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);

        success('Task Deleted!');
        navigate('/tasks');
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (error) {
        handleAjaxError(error);
      }
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await window.fetch(
        `/api/v1/tasks/${updatedTask.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedTask),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw Error(response.statusText);
      const newTasks = tasks;
      const idx = newTasks.findIndex((task) => task.id === updatedTask.id);
      newTasks[idx] = updatedTask;
      setTasks(newTasks);

      success('Task Updated!');
      navigate(`/tasks/${updatedTask.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <div className="grid">
          <TaskList tasks={tasks} />

          <Routes>
            <Route
              path=":id"
              element={<Task tasks={tasks} onDelete={deleteTask} />}
            />
            <Route
              path=":id/edit"
              element={<TaskForm tasks={tasks} onSave={updateTask} />}
            />
            <Route path="new" element={<TaskForm onSave={addTask} />} />
          </Routes>
        </div>  
      )}
    </>
  );
};

export default Editor;
