function middleware() {
  const wares = [];
  function use(fn) {
    wares.push(fn);
  }
  function serve(ctx = {}) {
    ctx.req = {};
    ctx.res = {};

    function done() {
      console.log('done', ctx);
    }

    let idx = 0;
    let next = function(err) {
      if (err) throw err;
      idx += 1;
      if (idx >= wares.length) return done();
      let fn = wares[idx];
      fn(ctx, next);
    }
  }
}

const app = middleware();
app.use((ctx, next) => {
  next();
})

app.serve(ctx);
