const express = require('express');
var cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const agenceRoute = require('./routes/agence');
const chargementRoute = require('./routes/chargement');

app.use(cors({credentials: true, origin: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));
app.use('/agence', agenceRoute);
app.use('/chargement', chargementRoute);

module.exports = app;