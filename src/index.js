const express = require('express');
const posts = require('./routers/post');
const comments = require('./routers/comment')
const users = require('./routers/user')
const subscriptions = require('./routers/subscription')
const messages = require('./routers/message')
const chats = require('./routers/chat')
const { createConnection } = require('./db/index')

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/posts', posts);
app.use('/comments', comments);
app.use('/users', users);
app.use('/subscriptions', subscriptions);
app.use('/messages', messages);
app.use('/chats', chats)

app.listen(PORT, () => {
  createConnection()
  console.log(`server started on ${PORT} port`);
});
