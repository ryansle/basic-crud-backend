const express = require('express');
const http = require('http');

const PORT = 8080;
const app = express();

const server = http.createServer(app);

// Health Check
app.use('/', (req, res) => {
  res.send('server is up');
});

// Get all lists
app.get('/lists', (req, res) => {

});

// Get a specific list
app.get('/lists/:id', (req, res) => {

});

// Create a new task within a list
app.post('/lists/:id/tasks', (req, res) => {

});

// Delete a task within a specific list
app.delete('/lists/:id/tasks/:taskId', (req, res) => {

});

// Update a specific task within a list
app.patch('/lists/:id/tasks/:taskId', (req, res) => {

});

// Delete a specific list
app.delete('/lists/:id', (req, res) => {

});

// PUT updates the whole resource
// PATCH updates individual fields of a resource, but can also update everything
app.patch('/lists/:id', (req, res) => {

});

// Add a new list
app.post('/lists', (req, res) => {

});

server.listen(PORT);
