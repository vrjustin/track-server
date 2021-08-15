require('./models/User');
require('./models/Track');
const mongoSecret = require('../secrets/mongoConnection.json');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');
const mongoUri = mongoSecret.connectURI;

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

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

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on Port 3000');
});
