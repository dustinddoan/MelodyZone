const express = require('express');
const app = express();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const { handleError, convertToApiError } = require('./middleware/apiError');
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');

require('dotenv').config();

// mongodb+srv://<username>:<password>@cluster0.l7iu4hg.mongodb.net/?retryWrites=true&w=majority
const mongoUri=`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`

mongoose.connect(mongoUri);

// body parser
app.use(express.json())

// middleware
app.use(xss());
app.use(mongoSanitize());

// passport
app.use(passport.initialize())
passport.use('jwt', jwtStrategy);

// routes
app.use('/api', routes)


// handle error
app.use(convertToApiError)

app.use((err, req, res, next) => {
    handleError(err, res)
})

// prepare for deployment
app.use(express.static('client/build'));
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    const port = app.address().port;
    console.log(`Server is running on port ${port}`);
});