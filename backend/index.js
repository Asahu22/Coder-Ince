const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config()
const { createServer } = require('http');
const webSocketManager = require('./websocketmanager/webSocketManager');

const {PORT, MONGO_USER, MONGO_PASSWORD}  = require('./config/config')
const mongoURL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ybc0o0u.mongodb.net/?retryWrites=true&w=majority&ssl=true`

const homeRouter = require('./routes/homeRoutes')
const problemsRouter = require('./routes/problemsRoutes')
const submissionsRouter = require('./routes/submissionsRoutes')
const userRouter = require('./routes/userRoutes')
const leaderboardRouter = require('./routes/leaderboardRoutes')
const compileRouter = require('./routes/compileRoutes')
const validateRouter = require('./routes/validateRoutes')

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL)
        .then(() => console.log("Successfully connected to DB"))
        .catch((e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000)
});
}

connectWithRetry();

const app = express();  

app.use(cors({ exposedHeaders: 'Authorization' }));
app.use(express.urlencoded());
app.use(express.json({urlencoded: true}))

app.use('/', homeRouter)
app.use('/problems', submissionsRouter, problemsRouter)
app.use('/leaderboard', leaderboardRouter)
app.use('/users', userRouter)
app.use('/compile', compileRouter)
app.use('/validate', validateRouter)

const httpServer = createServer(app);
webSocketManager.getInstance(httpServer);

httpServer.listen(PORT, () => console.log("Listening on port "+PORT));

// app.listen(PORT, () => console.log("Listening on port "+PORT));
