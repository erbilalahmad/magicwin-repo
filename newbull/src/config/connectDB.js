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
    host: '89.116.33.117',
    user: 'newbull',
    password: 'newbull',
    database: 'newbull',
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0
});

export default connection;
