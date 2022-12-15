const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authenticationRoutes = require('./routers/authenticationRouter');
const covidRouter = require('./routers/covidRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/authentication', authenticationRoutes);
app.use('/covid', covidRouter);

app.listen(process.env.PORT, (res, err) => {
    if(err) {
        console.log("Port not established. Connection failed");
    } else {
        console.log("Server running");
    }
});