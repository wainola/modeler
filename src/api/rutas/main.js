const Router = require('koa-router');
const router = new Router();

// NOTE: se renderiza lo que tengamos aca.
router.get('/' , async (ctx, next) => {
  console.log("Todos los datos");
  ctx.state = {
    title : 'KOA ES DIFICIL'
  };

  await ctx.render('home', {
    "dato" : "koa es dificil"
  })

})

module.exports = router;
