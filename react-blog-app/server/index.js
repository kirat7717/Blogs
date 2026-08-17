import "dotenv/config";
import http from 'http'
import app from "./app.js";
import connectDB from "./src/configs/db.config.js";
import "./src/cron/index.js";
import { setupWebSocket } from "./src/socket/index.js";

const PORT = process.env.PORT;
const server =  http.createServer(app)
await connectDB();



// Attach WebSocket
setupWebSocket(server);


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// app.listen(port, () => { // internally make the the http server 
//   console.log(`Example app listening on port ${port}`);
// });