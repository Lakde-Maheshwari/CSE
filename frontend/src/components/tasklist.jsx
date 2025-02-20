import Button from "./button";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();
  const HandleButtonClick = () => {
    navigate('/taskform');
  };

  const statusColors = {
    Completed: "text-green-400",
    Pursued: "text-orange-400",
    Pending: "text-red-400"
  };

  return (
    <div className="bg-gray-900 p-4 text-center text-white rounded-lg shadow-lg">
      {/* Header Section with Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Tasks</h2>
        <Button label="+ Add New Task" color="blue" onClick={HandleButtonClick} />
      </div>

      {/* Table Container */}
      <div className="p-4 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
        <table className="w-full border-collapse border border-gray-700 bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="border border-gray-600 p-3 text-left">Date</th>
              <th className="border border-gray-600 p-3 text-left">Status</th>
              <th className="border border-gray-600 p-3 text-left">Task Name</th>
            </tr>
          </thead>
          <tbody>
            {[{ date: "2025-02-03", status: "Completed", name: "Task 1" }, { date: "2025-02-04", status: "Pursued", name: "Task 2" }, { date: "2025-02-05", status: "Pending", name: "Task 3" }].map(
              (task, index) => (
                <tr key={index} className="border border-gray-700 bg-gray-800 hover:bg-gray-700 transition duration-300">
                  <td className="border border-gray-600 p-3">{task.date}</td>
                  <td className={`border border-gray-600 p-3 font-semibold ${statusColors[task.status]}`}>
                    {task.status}
                  </td>
                  <td className="border border-gray-600 p-3">{task.name}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
