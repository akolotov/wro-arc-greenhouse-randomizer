import * as path from 'path';
import express from 'express';
import generateField from './generate_field';

var app = express();


app.get('/field', async function(req, res, next) {
    let field = (await generateField());
    res.send(field);
    next();
});


// Serve static files
app.use('/', express.static(path.join('public')));

// Fire it up!
app.listen(3000);
console.log('Listening on port 3000');

// Console will print the message
console.log('Server running at http://127.0.0.1:3000/');
