import React from "react";

const Button = ({ label, onClick, color = "blue" }) => {
    const colors = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        red: "bg-red-500",
        yellow: "bg-yellow-500",
        gray: "bg-gray-400",
        purple: "bg-purple-400",
        orange: "bg-orange-400",
    };
    

    return (
        <button 
            className={`p-2 ${colors[color] || "bg-blue-700"} text-white rounded-md m-3 hover:border-white`} 
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
