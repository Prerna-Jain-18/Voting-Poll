const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());

// Replace '<your-mongodb-uri>' with the actual MongoDB connection URI
const uri = 'mongodb+srv://prernakhivasara15469:Prerna%4015469@mycluster.r275gj8.mongodb.net/pollingapp?retryWrites=true&w=majority';

// Optional: MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose.connect(uri, options)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful database connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define MongoDB schema and model for polls
const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
});

const Poll = mongoose.model('Poll', pollSchema);

// Define new API endpoint to fetch active polls
app.get('/api/active-polls', (req, res) => {
  Poll.find({}, (err, polls) => {
    if (err) {
      console.error('Error fetching active polls:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(polls);
  });
});

// Define new API endpoint to create a poll
app.post('/api/create-poll', (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || !options.length) {
    return res.status(400).json({ error: 'Question and options are required' });
  }

  const newPoll = new Poll({
    question,
    options,
  });

  newPoll.save((err, poll) => {
    if (err) {
      console.error('Error creating poll:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(poll);
  });
});

// Rest of your code for API endpoints and server setup remains unchanged
// ...

// Example API endpoint
app.get('/api/example', (req, res) => {
  res.json({ message: 'This is an example endpoint' });
});
