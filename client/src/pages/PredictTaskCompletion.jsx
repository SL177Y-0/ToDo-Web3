import { useState } from "react";
import Navigation from "../components/Navigation";

const PredictTaskCompletion = () => {
  const [taskDescription, setTaskDescription] = useState("");
  const [prediction, setPrediction] = useState("");

  const handlePredictCompletion = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/ethereum/predict-task-completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskDescription }),
      });
      const data = await res.json();
      if (data.status === 200) {
        setPrediction(data.prediction);
      } else {
        setPrediction("The Task is in progress and as i can predict it will be completed soon if you stay working hard for the task you can achieve anything.");
      }
    } catch (error) {
      console.error(error);
      setPrediction("The Task is in progress and as i can predict it will be completed soon if you stay working hard for the task you can achieve anything. ");
    }
  };

  return (
    <>
      <Navigation />
      <div className="predict_task_completion">
        <h2>Predict Task Completion</h2>
        <form onSubmit={handlePredictCompletion}>
          <label>
            Task Description:
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </label>
          <button type="submit">Predict Completion</button>
        </form>
        {prediction && <p>{prediction}</p>}
      </div>
    </>
  );
};

export default PredictTaskCompletion;