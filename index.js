const express = require('express')
const app = express();
const router = express.Router();
var createError = require('http-errors');
var path = require('path');



// express cfg

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



router.get('/health-check', (req, res) => {
  res.send('OK')
});

router.get('/', (req, res) => {
  res.send('OK')
});


app.use('/', router);





app.use(function(req, res, next) {
  return res.status(404).send({ message: 'Route '+req.url+' Not found.', code: 404, error_code: "not_found" });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log("error")
  // render the error page
  res.status(err.status || 500);
  res.render({error:'error'});
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!')
});
