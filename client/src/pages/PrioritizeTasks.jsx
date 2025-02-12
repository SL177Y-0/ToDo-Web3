import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

const PrioritizeTasks = () => {
  const [prioritizedTasks, setPrioritizedTasks] = useState("");

  useEffect(() => {
    const fetchPrioritizedTasks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/ethereum/prioritize-tasks", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const data = await res.json();
        if (data.status === 200) {
          setPrioritizedTasks(data.prioritizedTasks);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrioritizedTasks();
  }, []);

  return (
    <>
      <Navigation />
      <div className="prioritize_tasks">
        <h2>Prioritized Tasks</h2>
        <pre>{prioritizedTasks}</pre>
      </div>
    </>
  );
};

export default PrioritizeTasks;