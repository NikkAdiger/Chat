const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/config');
const postRouter = require('./routes/post');
const mongoose = require('mongoose');



const DB = `mongodb://${config.user}:${config.password}${config.name}`;

const clientPath = path.join(__dirname, 'client');
const port = process.env.port || config.port;
app.use(bodyParser.json());

app.use('/api/post', postRouter);

app.use(express.static(clientPath));

app.listen(port, () => {
    console.log('Server listen port: ' + port);
})

mongoose.connect(DB)
    .then(() => {
        console.log('Connecting to MongoDB...')
    })
    .catch((err) => {
        console.error(err);
    });


