const mongoose = require('mongoose')

const peliss= mongoose.Schema({
    
    nombre: String,
    protagonista: String,
    año: Number,
    sinopsis: String,
});

const contenedor = mongoose.model('peliculas', peliss) 

module.exports = {
    contenedor
}