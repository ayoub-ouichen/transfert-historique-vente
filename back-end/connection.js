var conx = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.VITE_DATABASE_USER,
    password: process.env.VITE_DATABASE_MDP,
    server:process.env.VITE_DATABASE_SERVER,
    database: '',
    options: {
        encrypt: true // for encrypted connections
    },
      trustServerCertificate: true
};

conx.connect(config, err => {
    if (err) console.log(err);
    else console.log('Connected to SQL Server');
});

module.exports = conx;
