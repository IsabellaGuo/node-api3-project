const express = require('express');
const helmet = require("helmet");

const server = express();

//routers
const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");




//custom middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl} ${new Date().getTime()}`);
  
	next();
}

server.use(logger);
server.use(helmet());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

