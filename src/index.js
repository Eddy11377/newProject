const express = require('express');
const posts = require('./routers/post');
const comments = require('./routers/comment')
const users = require('./routers/user')
const subscription = require('./routers/subscription')
const app = express();
const PORT = 3001;
app.use(express.json());

app.use('/posts', posts);
app.use('/comments', comments);
app.use('/users', users);
app.use('/subscriptions', subscription);

app.listen(PORT, () => {
  console.log(`server started on ${PORT} port`);
});
