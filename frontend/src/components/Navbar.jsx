import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignInAlt, faUserPlus, faCoins, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isTimerActive, setIsTimerActive] = useState(false); // State to manage timer visibility
  const [seconds, setSeconds] = useState(0); // Timer counter
  const [coinCount, setCoinCount] = useState(
    parseInt(localStorage.getItem("coinCount")) || 0
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Check for token in localStorage (or any other method)
    setIsAuthenticated(!!token); // Set authentication status based on token presence
  }, []);

  // Start Timer logic
  const startTimer = () => {
    setIsTimerActive(true); // Start timer
    setSeconds(0); // Reset seconds when the timer is started
    let interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Save interval ID to stop the timer later
    return interval;
  };

  // Stop Timer logic
  const stopTimer = (interval) => {
    setIsTimerActive(false);
    clearInterval(interval); // Clear the interval to stop the timer
  };

  // Format time in minutes:seconds format
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [interval, setIntervalId] = useState(null);

  const handleStart = () => {
    const intervalId = startTimer();
    setIntervalId(intervalId);
  };

  const handleStop = () => {
    stopTimer(interval);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md w-screen">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link
            to="/home"
            className="hover:text-teal-400 transition duration-300"
          >
            My App
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex space-x-8 ${isOpen ? "block" : "hidden"
            } md:space-x-8 md:items-center absolute md:static bg-gray-800 w-full md:w-auto left-0 px-6 py-4 md:p-0`}
        >
          <li>
            <Link
              to="/"
              className="flex items-center hover:text-teal-400 transition duration-300"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="flex items-center hover:text-teal-400 transition duration-300"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center hover:text-teal-400 transition duration-300"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Sign In
            </Link>
          </li>

          {/* Conditionally render Profile link if authenticated */}
          {isAuthenticated || (
            <li>
              <Link
                to="/profile"
                className="flex items-center hover:text-teal-400 transition duration-300"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
              </Link>
            </li>
          )}

          {/* Show the Timer or Start Button */}
          {isTimerActive ? (
            <li className="flex items-center">
              {/* Timer UI */}
              <div className="bg-teal-900 text-white px-4 py-3 rounded-md shadow-xl flex items-center">
                <span className="text-2xl font-semibold">{formatTime(seconds)}</span>
              </div>
              <button
                onClick={handleStop}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Stop Timer
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={handleStart}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Start Timer
              </button>
            </li>
          )}

          <li>
            <div className="absolute top-5 right-5 flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg">
              <FontAwesomeIcon icon={faCoins} className="text-xl" />
              <span className="text-lg font-semibold">{coinCount}</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
