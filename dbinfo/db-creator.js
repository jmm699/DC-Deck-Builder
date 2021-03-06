const { Client } = require('pg')
const fs = require('fs')

const dbInfo = require('./cards.json');

const pass = fs.readFileSync('./password.txt').toString().trim()

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'DC',
  password: pass
})

client.connect()

dbInfo.forEach(card => {
  let url = "http://www.nrdfeed.com/dcdb/scans/" + card.cardname + ".jpeg";

  let q = "INSERT INTO cards (cardname, image, cardtype, cost, victorypoints, power, count, url) VALUES ('" + card.cardname + "', '" + card.image + "', '" + card.cardtype + "', " + card.cost + ", " + card.victorypoints + ", " + card.power + ", " + card.count + ", '" + url + "')"; 
  
  client.query(q, (err, res) => {
    console.log(q)
    console.log(err, res);
  });
})
