const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const users = [];

app.get('/', (req, res) => {
    fs.readFile('index.html', function(err, data) {
        if (err) {
            res.status(500).send('Error reading index.html');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
});

app.post('/submit-form', (req, res) => {
    const username = req.body.username;
    res.send(`Username is ${username}`);
});

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            email: req.body.email,
            password: hashedPassword
        };
        users.push(user);
        res.redirect('/');
    } catch {
        res.status(500).send('Error registering user');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
