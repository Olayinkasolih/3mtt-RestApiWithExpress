const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let items = [];
let idCounter = 1;

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get single item by ID
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// Create new item
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) return res.status(400).json({ error: 'Name and description are required' });
  const newItem = { id: idCounter++, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update item by ID
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  const { name, description } = req.body;
  if (!name || !description) return res.status(400).json({ error: 'Name and description are required' });
  item.name = name;
  item.description = description;
  res.json(item);
});

// Delete item by ID
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
