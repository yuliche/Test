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

const db = pgp('postgres://postgres:m+|N|*az@localhost:5432/testdb');


app.post('/registr', (req, res) => {
  let newname = document.getElementById('name').value;
  let name = req.body.newname;
  console.log('req.body.newname');
  let email = document.getElementById('email').value;
      email = req.body.email;
  let pass = document.getElementById('pass').value;
      pass = req.body.pass;
  db.any(`INSERT INTO users VALUES(2, ${name}, ${email}, ${pass})`)
  .then(Response => {
   console.log(Response.name); // print user name;
  })
  .catch(error => {
      console.log(error); // print the error;
  });
})

// select and return user name from id:
db.one(`SELECT * FROM users WHERE name = 'Alice'`)
    .then(Response => {
     console.log(Response.name); // print user name;
    })
    .catch(error => {
        console.log(error); // print the error;
    });


const server = app.listen(8080, () => {
   const host = server.address().address
   const port = server.address().port
   console.log(`Listen on port: ${port}`);
});
