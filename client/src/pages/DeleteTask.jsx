import Navigation from "../components/Navigation";

const DeleteTask = () => {
  return (
    <>
      <Navigation />
      <div className="delete_task todo_btn">
        <form>
          <label>
            Task ID:
            <input id="taskID" />
          </label>
          <button type="submit">Delete Task</button>
        </form>
      </div>
    </>
  );
};

export default DeleteTask;