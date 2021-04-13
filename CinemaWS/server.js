const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');

require('./configs/dbConfig.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/movies', require('./routes/moviesRouter'));
app.use('/api/members', require('./routes/membersRouter'));
app.use('/api/users', require('./routes/usersRouter'));
app.use('/api/subscriptions', require('./routes/subscriptionsRouter'));


app.listen(5000, function() {
    console.log('Server is listening on port 5000!');
});