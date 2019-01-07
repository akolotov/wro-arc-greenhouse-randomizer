var path = require('path');
var express = require('express');
const util = require('util');

var app = express();

const generator_path = "generator/bin/generator";

async function generateField() {
    const exec = util.promisify(require('child_process').exec);

    const { stdout, stderr } = await exec(generator_path);

    let f = {};
    f = JSON.parse(stdout);
    if(stderr.toString().length > 0)
        f.err = stderr;
    else {
        f.err = null;
    }
    return f;
}

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
