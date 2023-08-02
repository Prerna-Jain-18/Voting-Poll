// app.js (Server-Side)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(cors());

// Replace this with your MongoDB connection string
const dbURI = '<Your-Connection-string>';

// Connect to MongoDB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
    http.listen(3001, () => {
      console.log('Server started on port 3001');
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the Poll schema and model
const pollSchema = new mongoose.Schema({
  question: String,
  options: [
    {
      text: String,
      votes: { type: Number, default: 0 },
    },
  ],
});

const Poll = mongoose.model('Poll', pollSchema);

// API endpoint to get all polls
app.get('/api/polls', async (req, res) => {
  try {
    const polls = await Poll.find({});
    return res.json(polls);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to create a new poll
app.post('/api/polls', async (req, res) => {
  try {
    const { question, options } = req.body;
    const poll = await Poll.create({ question, options });
    return res.status(201).json(poll);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('newPoll', (poll) => {
    socket.broadcast.emit('newPoll', poll);
  });
});
