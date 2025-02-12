import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <div className="logo">
          <img src={"/download.png"} alt="Logo" style={{ height: "40px" }} /></div>
      <nav>
        <ul>
          <li>
            <Link className="nav_link" to="/">
              WALLET
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/view-all-tasks">
              VIEW ALL
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/create-task">
              CREATE
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/view-task">
              CHECK 
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/update-task">
              UPDATE 
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/delete-task">
              DELETE 
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/prioritize-tasks">
              PRIORITIZE 
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/set-reminder">
              SET ALERT
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/get-reminders">
              GET ALERT
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/predict-task-completion">
              PREDICT COMPLETION
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;