const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

let foodItems = [];

app.post("/food", (req, res) => {
    let foodItem = {};
    let foodName = req.body.foodName;
    let calorieCount = req.body.calorieCount;
    let yummy = req.body.yummy;

    foodItem.foodName = foodName;
    foodItem.calorieCount = calorieCount;
    foodItem.yummy = yummy;

    foodItems.push(foodItem);

    res.send({"msg": "OK"});
    return;
})

app.get("/foods", (req, res) => {
    res.send(foodItems);
    return;
})

app.post("/reset", (req, res) => {
    foodItems = [];
    res.send({"msg": "OK"});
    return;
})

const port = 8080;
app.use(express.static('public'));
app.listen(port, () => console.log(`App started listening on port ${port}`));
