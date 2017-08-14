const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      pgp = require('pg-promise')(/*options*/),
      path = require('path'),
      nodemailer = require('nodemailer');

app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

  console.log(`${req.method} ${res.statusCode} ${req.url}`); //added method & StatusCode
    res.sendFile(path.join(__dirname + '/views' + 'index.html'));

});

app.get('/views/*', (req, res) => {

   res.sendFile(path.join(__dirname + '/views'));
});

const db = pgp('postgres://postgres:***********@localhost:5432/yulia');


app.post('/login')

// select and return user name from id:
db.one(`SELECT * FROM users WHERE "UserId" = 17`)
    .then(Response => {
     console.log(Response.Username); // print user name;
    })
    .catch(error => {
        console.log(error); // print the error;
    });

const server = app.listen(8080, () => {
   const host = server.address().address
   const port = server.address().port
   console.log(`Listen on port: ${port}`);
});