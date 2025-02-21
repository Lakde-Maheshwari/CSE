import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignInAlt, faUserPlus, faCoins, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [coinCount, setCoinCount] = useState(parseInt(localStorage.getItem("coinCount")) || 0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    if (isTimerActive) {
      const id = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [isTimerActive]);

  const handleStart = () => {
    setSeconds(0);
    setIsTimerActive(true);
  };

  const handleStop = () => {
    setIsTimerActive(false);
    clearInterval(intervalId);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getStrokeDasharray = () => {
    const progress = (seconds % 60) / 60;
    return `${progress * 283} 283`;
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md w-screen">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <Link to="/home" className="hover:text-teal-400 transition duration-300">
            My App
          </Link>
        </div>

        <ul className="md:flex space-x-8 hidden md:items-center">
          <li><Link to="/" className="flex items-center hover:text-teal-400 transition duration-300"><FontAwesomeIcon icon={faHome} className="mr-2" /> Home</Link></li>
          <li><Link to="/login" className="flex items-center hover:text-teal-400 transition duration-300"><FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Login</Link></li>
          <li><Link to="/register" className="flex items-center hover:text-teal-400 transition duration-300"><FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Sign Up</Link></li>
          <li><Link to="/createprofile" className="flex items-center hover:text-teal-400 transition duration-300"><FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Set up Profile</Link></li>
          {!isAuthenticated && (
            <li><Link to="/profile" className="flex items-center hover:text-teal-400 transition duration-300"><FontAwesomeIcon icon={faUser} className="mr-2" /> Profile</Link></li>
          )}

          <li>
            {isTimerActive ? (
              <div className="flex items-center">
                <div className="relative w-16 h-16">
                  <svg width="64" height="64" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#ddd" strokeWidth="6" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f39c12" strokeWidth="6" strokeDasharray="283" strokeDashoffset={283 - (seconds % 60) * 4.72} strokeLinecap="round" />
                    <text x="50" y="55" textAnchor="middle" fontSize="18" fill="white">{formatTime(seconds)}</text>
                  </svg>
                </div>
                <button onClick={handleStop} className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Stop</button>
              </div>
            ) : (
              <button onClick={handleStart} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Start Timer</button>
            )}
          </li>

          <li>
            <div className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg">
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