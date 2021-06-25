const express = require('express');
const mongoose = require('mongoose');

const app = express();

const  mongoUri = 'mongodb+srv://admin:CA0Azen28NUFQzN6@cluster0.pwo1h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo Instance!');
})
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to Mongo.', err);
})

app.get('/', (req, res) => {
    res.send('Hi There!');
});

app.listen(3000, () => {
    console.log('Listening on Port 3000');
});
