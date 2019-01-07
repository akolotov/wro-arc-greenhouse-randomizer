

function nextInt(max) {
    return Math.floor(Math.random() * max);
}



function nextIntIn(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

exports.nextInt = nextInt;
exports.nextIntIn = nextIntIn;
