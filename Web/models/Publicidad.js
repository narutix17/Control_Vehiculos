var Connection = require('tedious').Connection;

var config = {
    userName: 'sa',
    password: '123456',
    server: 'localhost',
    port: 1433,
    options: {
        database: 'control_vehiculos',
        instanceName: "SQLEXPRESS"
    }
};

var connection = new Connection(config);
connection.on('connect', function(err){
    if (err) 
        console.log(err);
    else
        console.log("Conexion Exitosa");
        executeStatement();
});
