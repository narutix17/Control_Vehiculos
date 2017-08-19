var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Crea el esquema del ejercicio
var publicidadSchema = new Schema({
    id: Number,
    nombre: String,
    region: [String],
    url_publicidad: String,
    fechaAgregada: String
},
{
    collection: 'Publicidades'
});


var Publicidad = mongoose.model("Publicidad", publicidadSchema);

module.exports = Publicidad;
