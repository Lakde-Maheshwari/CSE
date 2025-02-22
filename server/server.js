const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const meetingRoutes = require('./routes/meetingRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const aiRoutes = require('./routes/aiRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes'); // ✅ Import leaderboard routes
const profileRoutes = require("./routes/profileRoutes");
const taskRoutes = require("./routes/taskRoutes");
// const groupRoutes = require("./routes/groupRoutes");


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/meeting', meetingRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/leaderboard', leaderboardRoutes); 
app.use('/api/profile',profileRoutes);
app.use('/api/task',taskRoutes);
// app.use('/api/group',groupRoutes);


const polls = {}; // Store polls for each room

// ✅ Function to update leaderboard when user points or streak change
async function updateLeaderboard(userId) {
    try {
        await Leaderboard.updateLeaderboard();
        console.log(`Leaderboard updated for user ${userId}`);
    } catch (error) {
        console.error("Error updating leaderboard:", error);
    }
}

// Real-time communication setup
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', ({ roomId, username }) => {
        socket.join(roomId);
        console.log(`${username} joined room: ${roomId}`);
        io.to(roomId).emit('notification', `${username} has joined the room`);
    });

    socket.on('createPoll', ({ roomId, question, options }) => {
        const poll = {
            question,
            options: options.map(option => ({ text: option, votes: 0 })),
        };
        console.log(`Poll created in room ${roomId}:`, poll);
        io.to(roomId).emit('pollCreated', poll);
    });

    socket.on('vote', ({ roomId, optionIndex }) => {
        io.to(roomId).emit('pollUpdated', optionIndex);
    });

    socket.on('endPoll', ({ roomId }) => {
        io.to(roomId).emit('pollEnded', { message: 'Poll has ended!' });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 6471;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(express.json());