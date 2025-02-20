export default function Leaderboard() {
    // Sample Leaderboard Data (Later, Fetch from Backend)
    const leaderboard = [
      { rank: 1, name: "Alice", points: 120 },
      { rank: 2, name: "Bob", points: 105 },
      { rank: 3, name: "Charlie", points: 95 },
    ];
  
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-xl font-bold text-yellow-400">🏆 Leaderboard</h2>
        <table className="w-full mt-4">
          <thead>
            <tr className="text-left text-gray-300">
              <th className="py-2">Rank</th>
              <th className="py-2">Name</th>
              <th className="py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={index} className="text-gray-400">
                <td className="py-2">#{user.rank}</td>
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.points} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  