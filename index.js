//npm run dev <- para iniciar el server
const path = require('path')

const express = require('express')

const { config, engine} = require('express-edge') 

const { contenedor } = require('./peliculas');

const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const { Console } = require('console');

const app = new express ()

//body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const connectdb = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/movie',{
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log('conectado a mongodb'))
    .catch((e)=>console.log('error de conexión'+e))

}

connectdb();

app.use(engine);
app.set('views', `${__dirname}/views`);

app.set('port', process.env.PORT || 4000);


app.get('/' , async (req, res) => {
//    res.sendFile(path.resolve(__dirname, 'paginas/index.html'));Good luck 
   const pass = await contenedor.find()
   console.log(pass);
    res.render('index', {pass})
})

app.post('/agregar' , async (req, res) => {
    //    res.sendFile(path.resolve(__dirname, 'paginas/index.html'));Good luck 
       const agregar = contenedor(req.body)
       await agregar.save()
       console.log(agregar)
       const pass = await contenedor.find()
        res.send(JSON.stringify(pass))
    })

app.get('/ingresar' , (req, res) => {
    res.sendFile(path.resolve(__dirname, 'paginas/ingresar.html'))
    //res.render('ingresar')
})


app.get('/editar' , (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'paginas/editar.html'))
    res.render('editar')
})

app.get('/buscar' , async(req, res) => {
    res.sendFile(path.resolve(__dirname, 'paginas/buscar.html'))
    const find = await contenedor.find({nombre:req.body})
    console.log(find)
     res.send(JSON.stringify(find))
})

app.post('/find' , async(req, res) => {
    const f1=req.body.buscar;
    const find = await contenedor.find({nombre:f1})
    console.log(find)
     res.send(JSON.stringify(find))
})

const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
