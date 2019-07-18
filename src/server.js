const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

// Set up routes
app.get('/', (req, res) => {
    const indexFile = path.resolve(__dirname, '../dist/index.html');
    const fileContent = fs.readFileSync(indexFile, 'utf-8');
    res.send(fileContent);
});

// Set up about page route here./

// Set up a static directory for css, js, and images
app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}...`);
    console.log('Press Ctrl+C to quit.');
});
