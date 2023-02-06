const { set, connect } = require('mongoose');

set('strictQuery', true)

// Database -> fanpage-auth
connect('mongodb://localhost/fanpage-auth')
    .then(db => console.log('Database is connected'))
    .catch(err => console.log('Error in database', err))