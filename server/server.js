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
const taskRoutes = require('./routes/taskRoutes');

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
app.use('/api/tasks', taskRoutes);
// app.use('/api/group', groupRoute);  

const polls = {}; // Store polls for each room

// Real-time communication setup
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a specific room
    socket.on('joinRoom', ({ roomId, username }) => {
        socket.join(roomId);
        console.log(`${username} joined room: ${roomId}`);
        io.to(roomId).emit('notification', `${username} has joined the room`);
    });

    // Handle poll creation
    socket.on('createPoll', ({ roomId, question, options }) => {
        const poll = {
            question,
            options: options.map(option => ({ text: option, votes: 0 })),
        };
        console.log(`Poll created in room ${roomId}:`, poll);
        io.to(roomId).emit('pollCreated', poll); // Emit the poll to all clients in the room
    });

    // Handle voting
    socket.on('vote', ({ roomId, optionIndex }) => {
        io.to(roomId).emit('pollUpdated', optionIndex); // Notify room of the vote
    });

    // Handle poll ending
    socket.on('endPoll', ({ roomId }) => {
        io.to(roomId).emit('pollEnded', { message: 'Poll has ended!' });
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});


const PORT = process.env.PORT || 6471;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
