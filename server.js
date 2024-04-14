const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory database (replace with a real database in production)
const users = [];

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/register', async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user object
        const user = {
            email: req.body.email,
            password: hashedPassword
        };

        // Add the user to the database
        users.push(user);

        res.redirect('/login');
    } catch {
        res.status(500).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const user = users.find(user => user.email === req.body.email);
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Login successful');
        } else {
            res.send('Login failed');
        }
    } catch {
        res.status(500).send('Error logging in');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
