import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

const GetReminders = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/ethereum/get-reminders", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const data = await res.json();
        if (data.status === 200) {
          setReminders(data.reminders);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchReminders();
  }, []);

  return (
    <>
      <Navigation />
      <div className="get_reminders">
        <h2>Reminders</h2>
        <ul>
          {reminders.map((reminder, index) => (
            <li key={index}>
              Task ID: {reminder.taskId}, Reminder Date: {reminder.reminderDate}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GetReminders;