const express = require('express');

const app = express();

app.use(express.static('./dist/horno'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/horno'}),
);

app.listen(process.env.PORT || 8080);