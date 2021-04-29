const express = require('express');
const bodyParser = require('body-parser');

const app = express();

function echo(event) {
   let responseBody = '';
    if (event.op === "INSERT") {
        responseBody = `New user ${event.data.new.id} inserted, with data: ${event.data.new}`;      
    }
    else if (event.op === "UPDATE") {
        responseBody = `User ${event.data.new.id} updated, with data: ${event.data.new}`;
    }
    else if (event.op === "DELETE") {
        responseBody = `User ${event.data.old.id} deleted, with data: ${event.data.old}`;
    }

    return responseBody;
};

app.use(bodyParser.json());

app.post('/', function (req, res) {
    try{
        console.log('post');
        console.log(req);
        var result = echo(req.body.event);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.status(500).json(e.toString());
    }
});

app.get('/', function (req, res) {
  console.log('get');
  res.send('Hello World - For Event Triggers, try a POST request?');
  
});

var server = app.listen(process.env.PORT, function () {
    console.log("server listening");
});

