import Router from 'koa-router';
const router = new Router();
import Tarea from '../model/Tarea';

// NOTE: implementación cochina para verificar que funciones ES6
var tarea1 = new Tarea("Tarea 1", "Generar el front de Modeler", "27-10-2017", "28-10-2017");

// NOTE: se renderiza lo que tengamos aca.
router.get('/' , async (ctx, next) => {
  console.log("Todos los datos");
  // console.log(`Nombre tarea: ${tarea1.getNombre()}`);
  ctx.state = {
    title : 'KOA ES DIFICIL'
  };

  await ctx.render('home', {
    "dato" : tarea1.Nombre
  })

})

module.exports = router;
