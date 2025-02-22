const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const meetingRoutes = require("./routes/meetingRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
<<<<<<< HEAD
const groupRoutes = require("./routes/groupRoutes");
=======
const taskRoutes = require("./routes/taskRoutes");
// const groupRoutes = require("./routes/groupRoutes");

>>>>>>> 9edc319c0654d97a90eb09fd966aa907adcef59d

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

<<<<<<< HEAD
app.use("/api/auth", authRoutes);
app.use("/api/meeting", meetingRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/groups", groupRoutes);
=======
app.use('/api/auth', authRoutes);
app.use('/api/meeting', meetingRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/leaderboard', leaderboardRoutes); 
app.use('/api/profile',profileRoutes);
app.use('/api/task',taskRoutes);
// app.use('/api/group',groupRoutes);
>>>>>>> 9edc319c0654d97a90eb09fd966aa907adcef59d

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

app.use(express.json());