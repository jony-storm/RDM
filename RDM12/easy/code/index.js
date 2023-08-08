const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = 8080;
app.use(express.static('public'));
app.listen(port, () => console.log(`App started listening on port ${port}`));
