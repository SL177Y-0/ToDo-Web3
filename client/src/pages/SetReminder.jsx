import { useState } from "react";
import Navigation from "../components/Navigation";

const SetReminder = ({ state }) => {
  const [taskId, setTaskId] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSetReminder = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/ethereum/set-reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, reminderDate }),
      });
      const data = await res.json();
      if (data.status === 200) {
        setMessage("Reminder set successfully");
      } else {
        setMessage("Error setting reminder");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error setting reminder");
    }
  };

  return (
    <>
      <Navigation />
      <div className="set_reminder">
        <h2>Set Reminder</h2>
        <form onSubmit={handleSetReminder}>
          <label>
            Task ID:
            <input
              type="text"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
            />
          </label>
          <label>
            Reminder Date:
            <input
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
            />
          </label>
          <button type="submit">Set Reminder</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default SetReminder;