import { useState } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTask from './pages/CreateTask';
import Wallet from './pages/Wallet';
import ViewAllTasks from './pages/ViewAllTasks';
import UpdateTask from './pages/UpdateTask';
import ViewTask from './pages/ViewTask';
import DeleteTask from './pages/DeleteTask';
import PrioritizeTasks from './pages/PrioritizeTasks';
import SetReminder from './pages/SetReminder';
import GetReminders from './pages/GetReminders';
import PredictTaskCompletion from './pages/PredictTaskCompletion';

import './App.css';

function App() {
  const [state, setState] = useState({ web3: null, contract: null, account: null });

  const saveState = ({ web3, contract, account }) => {
    setState({ web3: web3, contract: contract, account: account });
  };

  const router = createBrowserRouter([
    { path: '/', element: <Wallet saveState={saveState} /> },
    { path: '/view-all-tasks', element: <ViewAllTasks /> },
    { path: '/create-task', element: <CreateTask state={state} /> },
    { path: '/view-task', element: <ViewTask /> },
    { path: '/update-task', element: <UpdateTask state={state} /> },
    { path: '/delete-task', element: <DeleteTask state={state} /> },
    { path: '/prioritize-tasks', element: <PrioritizeTasks /> },
    { path: '/set-reminder', element: <SetReminder state={state} /> },
    { path: '/get-reminders', element: <GetReminders /> },
    { path: '/predict-task-completion', element: <PredictTaskCompletion /> }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
