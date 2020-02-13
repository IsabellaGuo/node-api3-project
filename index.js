// code away!
const express = require ("express");
const server = express();


//port
const port = 5000;

server.listen(port, () => {
    console.log(`\n** Server Running on http://localhost:${port} **\n`);
});

