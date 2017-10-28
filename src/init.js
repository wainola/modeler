/*
Inclusion de modulos
*/
import koa from 'koa';
import mongoose from 'mongoose';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import error from 'koa-json-error';
import logger from 'koa-logger';
import handleError from 'koa-handle-error';
import rutas_api from './api/rutas/main';
import views from 'koa-views';
import bluebird from 'bluebird';

// TODO => añadir el controlador de la vista.

export const app = new koa();
const puerto = 4000;

// NOTE: testeando setup inicial
// app.use(ctx => {
//   ctx.body = "Hola Koa";
// });
//
// app.listen(4000, () => {
//   console.log("Listening on port 3000");
// });

mongoose.Promise = bluebird;
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

// NOTE: definicion de recursos estaticos
app.use(convert(require('koa-static')(__dirname + '/public')));

// NOTE: seteando el motor de plantilla previo su instalación y añadido en el package.json
app.use(views(__dirname + '/views', {
  map: {
    hbs: "handlebars"
  },
  extension: "hbs"
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
  console.log(`Servidor escuchando en puerto ${puerto}`)
})
