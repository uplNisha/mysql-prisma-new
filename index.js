const express = require('express');
const routes = require('./src/route/route');


const port = 5000;

const app = express();
app.use(express.json());
app.use("/api", routes);

const server = app.listen(port, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: http://localhost:${port} 🛡️
    ################################################
  `);
    
});





// import express from 'express';
// // import connectToDb from "./database/index";
// import cors from "cors";
// import routes from "./routes/routes";

// const app = express();
// const port = 7000;
// const whitelist = [
//     "http://localhost:3000",
//     "http://localhost:3001",
//     "http://localhost:3002",
//   ];
// app.use(cors({ origin: whitelist, credentials: true }));
// app.use(express.json({ limit: '50mb' }));
// app.use("/api", routes); //or app.use(config.api.prefix, routes); 

// //Connection to mongoDB
// // connectToDb();

// const server = app.listen(port, () => {
//     console.log(`
//       ################################################
//       🛡️  Demo server listening on port: http://localhost:${port} 🛡️
//       ################################################
//     `);
 
//   });
//   server.setTimeout(500000)
