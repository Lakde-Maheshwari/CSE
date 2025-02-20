import React, { useState } from "react";

const Poll = () => {
  // State to store votes for each option
  const [votes, setVotes] = useState([
    { option: "Option 1", count: 120 },
    { option: "Option 2", count: 90 },
    { option: "Option 3", count: 60 },
    { option: "Option 4", count: 30 },
  ]);

  // Calculate total votes
  const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);

  return (
    <div className="bg-gray-600 to-gray-900 h-auto rounded-lg shadow-lg p-6 flex m-4 items-start">
      <div className="text-white text-left w-full">
        <div className="text-lg font-bold mb-4">1. Question</div>
        <ul className="space-y-3">
          {votes.map((vote, index) => (
            <li
              key={index}
              className="flex flex-col bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-300"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-500 mr-3 cursor-pointer"
                />
                {vote.option}
              </div>
              <div className="text-sm text-gray-400 mt-2">
                {vote.count} votes ({((vote.count / totalVotes) * 100).toFixed(1)}%)
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Poll;
