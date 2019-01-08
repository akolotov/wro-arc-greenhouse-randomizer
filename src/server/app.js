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

const port = process.env.PORT || 3000;
// Fire it up!
app.listen(port);
console.log('Listening on port' + port);
