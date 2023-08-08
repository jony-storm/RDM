const { request } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// a in memory database for tables
let tables = []
let id = 101;
for(let i = 0; i < 5; i++) {
  for(let j = 0; j < 5; j++) {
    tables.push({id: id.toString(), row:i+1, column:j+1, net_worth:null});
    id += 1;
  }
}

function find_table(id) {
  let len = tables.length
  for(let i = 0; i < len; i++) {
    if (tables[i].id === id) return i;
  }
  return -1
}
app.use(express.static('public'));

app.listen(port, () => console.log(`App started listening on port ${port}`));

app.get('/api', (req, res) => {
  res.status(200).send({
    hello: 'world'
  });
});
app.get('/api/tables', (req, res) => {
  res.status(200).send(tables);
});

app.patch('/api/tables/:id/reservation', (req, res) => {
  let id = req.params.id;
  let net_worth = req.body.net_worth;
  let table = find_table(id)
  if (table > -1) {
    if (!net_worth) {    
      res.status(400).send();
      return;
    }
    if(tables[table].net_worth != null) {      
      res.status(400).send();
      return;
    }
    if(net_worth >= 50000 && net_worth <= 20000000) {
      tables[table].net_worth = net_worth;
      res.status(204).send();
    } else {
      res.status(400).send();
      return;
    }
  } else {
    res.status(404).send();
  }  
});


app.delete('/api/tables/:id/reservation', (req, res) => {
  let id = req.params.id;
  let table = find_table(id)
  if (table > -1) {
    if(tables[table].net_worth === null) {      
      res.status(400).send();
      return;
    }
    tables[table].net_worth = null
    res.status(204).send();
  } else {
    res.status(404).send();
  }  
});
