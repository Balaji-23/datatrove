import { useNavigate } from "react-router-dom";
import trovegif from '../assets/Trove.gif';
import '../css/navigation.css';

export default function Navigationbar() {
  const navigate = useNavigate();

  // Fetch the username from localStorage
  const username = localStorage.getItem('username');

  // Check if the user is logged in by checking localStorage for the token
  const isLoggedIn = localStorage.getItem('auth_token') ? true : false;

  // Logic for handling login button click
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to login page
  };

  return (
    <>
      <nav className="navbar navbar-light bg-dark bg-gradient">
        <div className="container-fluid">
          <span className="h1 fw-bold mb-0">
            <img src={trovegif} alt="trovegif" style={{ height: 60, margin: 10 }} />
          </span>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            {!isLoggedIn ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleLoginClick} // Navigate to login page
              >
                Login User
              </button>
            ) : (
              <span className="text-white fw-bold">Welcome {username || "Guest"}</span> // Show username or "Guest"
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
