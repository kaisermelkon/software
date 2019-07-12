import mysql from 'promise-mysql';
import keys from './keys';

/**
* Crea un pool con la informacion del servidor
*/
const pool = mysql.createPool(keys.database);
pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log("db conectada fhfhf");
});

/**
* Exporta el pool creada
*/
export default pool;