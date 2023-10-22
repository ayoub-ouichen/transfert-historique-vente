var conx = require('mssql');
const config = {
    user: 'devouichen',
    password: 'devouichen',
    server:'10.7.0.90',
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
