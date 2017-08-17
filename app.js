const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      pgp = require('pg-promise')(/*options*/),
      path = require('path'),
      nodemailer = require('nodemailer');

function handleSayHello(req, res){
const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'testsendergame@gmail.com', // Your email id
            pass: 'testemail06' // Your password
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
}

const mailOptions = {
    from: 'testsendergame@gmail.com', // sender address
    to: 'testsendergame@gmail.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: `Hello my dear` // + ${user.name}
}


app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views' + 'index.html'));
});

app.get('/views/*', (req, res) => {
   res.sendFile(path.join(__dirname + '/views'));
});

const db = pgp('postgres://postgres:kfgekz8906@localhost:5432/testdb');

app.post('/login', (req, res, next) => {
    const email = req.body.emailLog;
    const pass = req.body.passLog;
    db.one(`SELECT pass, name FROM users WHERE email = '${email}'`)
    .then(data => {
        if (data.pass === pass){
            console.log(`Hello ${data.name}`);
        }
    }).catch(err => {
      return next(err);
});
});


app.post('/registr', (req, res, next) => {
  if (req.body.pass !== req.body.pass2) {
    next(new Error('Passwords do not match'));
  }
db.none(`INSERT INTO users(name, email, pass)` +
 `VALUES('${req.body.name}', '${req.body.email}', '${req.body.pass}')`, req.body)
.then(() => {
      res.status(200);
    }).catch(err => {
      return next(err);
    });

    // res.redirect(307, '/');/**************************///
});
     // handleSayHello;

const server = app.listen(8080, () => {
   const host = server.address().address
   const port = server.address().port
   console.log(`Listen on port: ${port}`);
});
