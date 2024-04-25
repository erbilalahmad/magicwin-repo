// const mysql = require('mysql2/promise');

// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'bigbull'
// });



// export default connection;
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newbull',
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0
});

export default connection;
