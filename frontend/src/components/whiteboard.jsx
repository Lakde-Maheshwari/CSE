import React, { useRef, useState, useEffect } from "react";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [fillColor,setFillColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2); // Improve drawing quality
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, [color, brushSize,fillColor]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const fillCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = fillColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };


  return (
    <div className="h-screen w-screen flex flex-col fixed top-0 left-0">
      {/* Toolbar Section */}
      <div className="flex items-center bg-gray-800 p-4">
        <button
          onClick={clearCanvas}
          className="p-2 bg-blue-700 text-white rounded-sm mr-3"
        >
          Clear
        </button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mr-3"
        />
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(e.target.value)}
        />

        <button className="p-3 m-3 bg-blue-500"
        onClick={fillCanvas}> 
        Fill color </button>
        <input type="color" 
        value={fillColor}
        onChange={(e) => setFillColor(e.target.value)}
        className="ml-2"
        />
        
      </div>

      {/* Canvas Section */}
      <div className="flex-1 border-white-2 bg-black">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full cursor-crosshair"
        />
      </div>
    </div>
  );
};

export default Whiteboard;
