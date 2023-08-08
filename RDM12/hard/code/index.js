const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

app.get("/hard", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
    return;
})

const port = 8080;
app.listen(port, () => console.log(`App started listening on port ${port}`));
