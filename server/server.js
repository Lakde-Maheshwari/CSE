const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const meetingRoutes = require("./routes/meetingRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const taskRoutes = require("./routes/taskRoutes");
// const groupRoutes = require("./routes/groupRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/meeting', meetingRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/leaderboard', leaderboardRoutes); 
app.use('/api/profile', profileRoutes);
app.use('/api/task', taskRoutes);
// app.use('/api/group', groupRoutes);


const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;



// DeepSeek API endpoint
app.post('/api/deepseek', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post(
            'https://api.deepseek.com/v1/chat/completions', // Replace with the actual DeepSeek API endpoint
            {
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error calling DeepSeek API:', error);
        res.status(500).json({ error: 'Failed to fetch response from DeepSeek' });
    }
});

const rooms = {}; // Store users in each video chat room

// WebRTC Signaling with Socket.io
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", ({ roomId, username }) => {
        socket.join(roomId);
        console.log(`${username} joined room: ${roomId}`);

        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }
        rooms[roomId].push({ id: socket.id, username });

        // Notify all users in the room about the new user
        io.to(roomId).emit("userJoined", { id: socket.id, username });

        // Send the updated user list to everyone in the room
        io.to(roomId).emit("updateUserList", rooms[roomId]);
    });

    // WebRTC signaling: offer, answer, ICE candidates
    socket.on("signal", (data) => {
        io.to(data.to).emit("signal", { from: socket.id, ...data });
    });

    // User leaves the room
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);

        // Remove the user from all rooms
        for (const roomId in rooms) {
            rooms[roomId] = rooms[roomId].filter(user => user.id !== socket.id);
            io.to(roomId).emit("updateUserList", rooms[roomId]);
        }
    });
});

const PORT = process.env.PORT || 6471;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
