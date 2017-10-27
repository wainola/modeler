/*
Inclusion de modulos
*/

const koa = require('koa');
const mongoose = require('mongoose');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const error = require('koa-json-error');
const logger = require('koa-logger');
const koaRes = require('koa-res');
const handleError = require('koa-handle-error');
// // Servir assets estaticos.
// const serve = require('koa-static-server');
const rutas_api = require('./api/rutas/main');
const views = require('koa-views');

// TODO => añadir el controlador de la vista.

const app = new koa();

// NOTE: testeando setup inicial
// app.use(ctx => {
//   ctx.body = "Hola Koa";
// });
//
// app.listen(4000, () => {
//   console.log("Listening on port 3000");
// });

mongoose.Promise = require('bluebird');
mongoose
.connect('mongodb://localhost/')
.then((response) => {
  console.log("Conexion exitosa a MongoDB");
})
.catch((err) => {
  console.log("Error al conectarse a MongoDB");
  console.log(err);
})


/*
Configuración del Servidor
*/

// NOTE: manejo de errores.
app.use(async (ctx, next) => {
  try{
    await next()
  }
  catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

app.use(convert(require('koa-static')(__dirname + '/public')));

// NOTE: seteando el motor de plantilla previo su instalación y añadido en el package.json
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// NOTE: logging
app.use(logger())
// NOTE: body parsing
app.use(bodyParser())
// NOTE: formateo de respuesta como JSON => el logger permite tener formato de respuesta en consola bonito.
// app.use(convert(koaRes()))
// NOTE: configuración de las rutas.
app.use(rutas_api.routes()).use(rutas_api.allowedMethods())
// app.use(router(_ => {
//   _.get('/', async (ctx) => {
//     ctx.body = "Rutas"
//   })
// }))
app.listen(4000, () =>{
  console.log("Servidor escuchando en puerto 4000")
})
