require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5002;

app.use(cors({
    origin: ['http://localhost:3000', process.env.FRONTEND_URL],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use(session({
    name: 'guest_sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }
}));

app.use('/api', require('./routes/projects'));
app.use('/api', require('./routes/contact'));


app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});