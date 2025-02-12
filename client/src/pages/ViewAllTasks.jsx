import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

const ViewAllTasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [completionRate, setCompletionRate] = useState(0);

  useEffect(() => {
    const allTasks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/ethereum/view-all-task", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const data = await res.json();
        if (data.status === 200) {
          setTaskList(data.taskList);
          calculateCompletionRate(data.taskList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    allTasks();
  }, []);

  const calculateCompletionRate = (tasks) => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const rate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    setCompletionRate(rate.toFixed(2));
  };

  const handleCompletionChange = async (taskId, completed) => {
    try {
      const res = await fetch("http://localhost:3000/api/ethereum/complete-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, completed }),
      });
      const data = await res.json();
      if (data.status === 200) {
        const updatedTasks = taskList.map(task =>
          task.taskId === taskId ? { ...task, completed } : task
        );
        setTaskList(updatedTasks);
        calculateCompletionRate(updatedTasks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="view_all_tasks">
        <h2>Task Completion Rate: {completionRate}%</h2>
        {taskList.map((task) => (
          <div
            className="view_all_tasks_card"
            key={task.taskId}
            style={task.taskId !== "" && task.name !== "" && task.date !== "" ? {} : { display: "none" }}
          >
            <p>{task.taskId}</p>
            <p>{task.name}</p>
            <p>{task.date}</p>
            <label>
              <nbsp>Done</nbsp>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => handleCompletionChange(task.taskId, e.target.checked)}
              />
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewAllTasks;
