const express = require('express');
var users = require('./routes/users');
var characters = require('./routes/characters');
var items = require('./routes/items');
var campaigns = require('./routes/campaigns');
var http = require('http');

const app = express();

app.use('/', users);
app.use('/', characters);
app.use('/', items);
app.use('/', campaigns);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//crea un servidor http
app.set('port', process.env.PORT || 8080);
http.createServer(app).listen(app.get('port'), () => {
    console.log('Servidor iniciado, escuchando por el puerto ' + app.get('port'));
});