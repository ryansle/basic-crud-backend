// Controllers
import ListManager from './listManager';

const express = require('express');
const http = require('http');

const PORT = 8080;
const app = express();

const server = http.createServer(app);

const listManager = new ListManager();

const sendError = (res, error) => {
  res.status(400);
  res.send(JSON.stringify({ error }));
};

app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.send('server is up');
});

// Get all lists
app.get('/lists', async (req, res) => {
  try {
    const list = await listManager.getLists();
    res.send(JSON.stringify(list));
  } catch (e) {
    sendError(res, e);
  }
});

// Get a specific list
app.get('/lists/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const list = await listManager.getListById(id);
    res.send(JSON.stringify(list));
  } catch (e) {
    sendError(res, e);
  }
});

// Delete a specific list
app.delete('/lists/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const list = await listManager.deleteList(id);
    res.send(JSON.stringify(list));
  } catch (e) {
    sendError(res, e);
  }
});

// PUT updates the whole resource
// PATCH updates individual fields of a resource, but can also update everything
app.patch('/lists/:id', async (req, res) => {
  const body = req.body;
  const id = req.params.id

  try {
    const list = await listManager.updateList(id, body);
    res.send(JSON.stringify(list));
  } catch (e) {
    sendError(res, e);
  }
});

// Add a new list
app.post('/lists', async (req, res) => {
  const body = req.body;
  try {
    const list = await listManager.createList(body);
    res.send(JSON.stringify(list));
  } catch (e) {
    console.log(e);
    sendError(res, e);
  }
});

// // Create a new task within a list
// app.post('/lists/:id/tasks', async (req, res) => {

// });

// // Delete a task within a specific list
// app.delete('/lists/:id/tasks/:taskId', async (req, res) => {

// });

// // Update a specific task within a list
// app.patch('/lists/:id/tasks/:taskId', async (req, res) => {

// });

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});
