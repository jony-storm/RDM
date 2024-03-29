const path = require('path');
const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get("/calculator", (req, res) => {
    res.sendFile(path.join(__dirname, '/form.html'));
})

app.listen(port, () => console.log(`App started listening on port ${port}`));
