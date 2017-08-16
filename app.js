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

const db = pgp('postgres://postgres:***@localhost:5432/testdb');

app.post('/login', (req, res) => {
    const email = req.body.emailLog;
    const pass = req.body.passLog;
    db.one(`SELECT pass, name FROM users WHERE email = '${email}'`)
    .then(data => {
        if (data.pass === pass){
            console.log(`Hello ${data.name}`);
        }
    }).catch(error => console.log('error:', error));
});


app.post('/registr', (req, res) => {
  if (req.body.pass !== req.body.pass2) {
    next(new Error('Passwords do not match'));
  }

  const newUser = {
      name : req.body.name,
      email : req.body.email,
      pass : req.body.pass
    } 
      //console.log(newUser.name, newUser.email, newUser.pass);
      addNewUserToDB (newUser);  
      handleSayHello;
      res.redirect(307, '/');/**************************///
});

function addNewUserToDB(user){
db.one(`INSERT INTO users(name, email, pass) VALUES('${user.name}', '${user.email}', '${user.pass}')`)
.then(() => {
    res.send('Success');/**************************///
})
    .catch(error => console.log('error:', error));
    }



const server = app.listen(8080, () => {
   const host = server.address().address
   const port = server.address().port
   console.log(`Listen on port: ${port}`);
});
