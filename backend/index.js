const express = require('express')
const app = express()

require('dotenv').config()

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoose = require('mongoose');
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 500
};

mongoose.connect(process.env.MONGODB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

require('./models/Media')
require('./models/User')
require('./models/Comment')

app.use('/media', require('./routes/media'))
app.use('/user', require('./routes/user'))
app.use('/comment', require('./routes/comment'))
app.use('/watchlist', require('./routes/watchlist'))

const passport = require('passport')
require('./passport')(passport)
app.use(passport.initialize())

const port = 3000

app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})