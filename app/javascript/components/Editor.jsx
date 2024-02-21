import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import TaskList from './TaskList';

const Editor = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/v1/tasks.json');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      { isError && <p>Something went wrong. Check the console.</p> }

      { isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TaskList tasks={tasks} />

          <Routes>
            <Route path=":id" element={<Task tasks={tasks} />} />
          </Routes>
        </>
      ) }
    </>
  );
};

export default Editor;