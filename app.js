const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const url = process.env.DB_CONNECTION;

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Import routes
const studiosRoute = require('./routes/studios');
const filmsRoute = require('./routes/films');
const authRoute = require('./routes/auth');
const favRoute = require('./routes/favoritos');

app.use('/studios', studiosRoute);
app.use('/films', filmsRoute);
app.use('/api/user', authRoute);
app.use('/api/favoritos', favRoute);


//Routes
app.get('/', (req, res) => {
    res.send('We are on home');
});

// Connection to DB!
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
})




// Listening...
app.listen(4000, () => console.log('Server up and running'));