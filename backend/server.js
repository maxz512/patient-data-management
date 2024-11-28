// server.js
const express = require('express');
const dotenv = require('dotenv');
const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');

// Initialize environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Example API route
app.get('/api', (req, res) => {
  res.send('Patient Data Management API');
});

// Route to get all patients (Example: Query DynamoDB using SDK v3)
app.get('/patients', async (req, res) => {
  const client = new DynamoDBClient({ region: process.env.AWS_REGION });
  
  try {
    const command = new ScanCommand({ TableName: process.env.DYNAMODB_TABLE });
    const data = await client.send(command);
    res.json(data.Items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
