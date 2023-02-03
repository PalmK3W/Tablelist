var app = require('express')();
var http = require('http').createServer(app);
const bodyParser = require("body-parser");
var cors = require('cors');
// const StatManager = require('./stat_manager');
const DBConnect = require('./dbconnect');
app.use(cors());


app.use(bodyParser.json());
app.post('/get_item',(req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
  DBConnect.CallList();

});
app.post('/add',(req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
let inputURL = req.body;
console.log(inputURL)
DBConnect.Add(inputURL);

});

app.post('/edit',(req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
let inputURL = req.body;
console.log(inputURL);
DBConnect.Edit(inputURL);
});
app.post('/delete',(req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
let inputURL = req.body;
console.log(inputURL);
DBConnect.Delete(inputURL);

});

http.listen(4000, () => {
        console.log('go to http://localhost:4000');
      });