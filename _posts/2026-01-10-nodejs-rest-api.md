---
layout: post
title: "Building Your First REST API with Node.js and Express"
date: 2026-01-10 09:00:00 +0700
author: John Doe
tags: [nodejs, express, api, backend, tutorial]
excerpt: "Learn how to build a production-ready REST API from scratch using Node.js and Express in this step-by-step tutorial."
image: /assets/images/posts/nodejs-api.jpg
---

# Building Your First REST API with Node.js and Express

Building a REST API is an essential skill for modern web developers. In this tutorial, we'll create a fully functional REST API using Node.js and Express.

## What We'll Build

We're going to create a simple blog API with the following endpoints:

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

## Prerequisites

- Node.js 18+ installed
- Basic JavaScript knowledge
- Familiarity with npm

## Setting Up the Project

First, create a new directory and initialize a Node.js project:

```bash
mkdir blog-api
cd blog-api
npm init -y
```

Install the required dependencies:

```bash
npm install express dotenv
npm install --save-dev nodemon
```

## Creating the Server

Create `server.js`:

```javascript
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Blog API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Creating the Data Model

For simplicity, we'll use an in-memory array. In production, you'd use a database.

Create `models/post.js`:

```javascript
let posts = [
  {
    id: 1,
    title: 'First Post',
    content: 'This is the first post',
    author: 'John Doe',
    createdAt: new Date()
  }
];

let nextId = 2;

const Post = {
  getAll: () => posts,
  
  getById: (id) => posts.find(post => post.id === parseInt(id)),
  
  create: (postData) => {
    const newPost = {
      id: nextId++,
      ...postData,
      createdAt: new Date()
    };
    posts.push(newPost);
    return newPost;
  },
  
  update: (id, postData) => {
    const index = posts.findIndex(post => post.id === parseInt(id));
    if (index === -1) return null;
    
    posts[index] = {
      ...posts[index],
      ...postData,
      updatedAt: new Date()
    };
    return posts[index];
  },
  
  delete: (id) => {
    const index = posts.findIndex(post => post.id === parseInt(id));
    if (index === -1) return false;
    
    posts.splice(index, 1);
    return true;
  }
};

module.exports = Post;
```

## Creating Routes

Create `routes/posts.js`:

```javascript
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// GET all posts
router.get('/', (req, res) => {
  const posts = Post.getAll();
  res.json({
    success: true,
    count: posts.length,
    data: posts
  });
});

// GET single post
router.get('/:id', (req, res) => {
  const post = Post.getById(req.params.id);
  
  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }
  
  res.json({
    success: true,
    data: post
  });
});

// CREATE post
router.post('/', (req, res) => {
  const { title, content, author } = req.body;
  
  // Validation
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Please provide title and content'
    });
  }
  
  const newPost = Post.create({ title, content, author });
  
  res.status(201).json({
    success: true,
    data: newPost
  });
});

// UPDATE post
router.put('/:id', (req, res) => {
  const updatedPost = Post.update(req.params.id, req.body);
  
  if (!updatedPost) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }
  
  res.json({
    success: true,
    data: updatedPost
  });
});

// DELETE post
router.delete('/:id', (req, res) => {
  const deleted = Post.delete(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }
  
  res.json({
    success: true,
    message: 'Post deleted successfully'
  });
});

module.exports = router;
```

## Connecting Routes to Server

Update `server.js`:

```javascript
const express = require('express');
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Blog API' });
});

app.use('/api/posts', postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Testing the API

You can test the API using tools like Postman or curl:

```bash
# Get all posts
curl http://localhost:3000/api/posts

# Create a post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"New Post","content":"Post content","author":"Jane"}'

# Get single post
curl http://localhost:3000/api/posts/1

# Update a post
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete a post
curl -X DELETE http://localhost:3000/api/posts/1
```

## Next Steps

To make this production-ready, consider adding:

1. **Database Integration** - Use MongoDB, PostgreSQL, or MySQL
2. **Authentication** - Implement JWT or OAuth
3. **Validation** - Use libraries like Joi or express-validator
4. **Rate Limiting** - Prevent API abuse
5. **Documentation** - Use Swagger/OpenAPI
6. **Testing** - Write unit and integration tests
7. **Logging** - Implement proper logging with Winston or Morgan

## Conclusion

Congratulations! You've built a functional REST API with Node.js and Express. This foundation can be extended to build complex, production-ready applications.

{% include author-bio.html %}
