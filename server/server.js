const express = require('express');
const app = express();
// Import routes
//require('./_routes')(app);   // <-- or whatever you do to include your API endpoints and middleware
app.set('port', 8080);
app.listen(app.get('port'), function() {
    console.log('Node App Started');
});
//
// import express from "express"
// import http from "http"
//
// /**
//  * Create HTTP server.
//  */
// const app = express()
//
// const server = http.createServer(app)
//
// /**
//  * App is an instance of EventEmitter so we can easily subscribe to events aka: listen for the 'ready' event
//  * Listen on provided port, on all network interfaces.
//  */
// server.on("ready", async() => {
//     try {
//         server.listen(2222)
//     }
//     catch (error) {
//
//     }
// })
//
// server.on("error", async error => { // @ToDo: Need improve this later
//     try {  }
//     catch (e) { /* Nothing hear */ }
// })
// server.on("listening", () => { console.log(`Node server listening on port::2222`) })
// server.emit("ready") // @ToDo: Emit this event on successful redis connection
