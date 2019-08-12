const express = require('express')
const app = express();
const router = express.Router();
const createError = require('http-errors');
const path = require('path');
const userController = require('./controllers/userController');



// express cfg

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//routes
router.get('/user/login', userController.login)






router.get('/health-check', (req, res) => {
  res.send('OK')
});


router.get('/', (req, res) => {
  res.send('OK')
});


app.use('/', router);





// error handler
app.use(function(err, req, res, next) {
 
  console.log(err)
  // render the error page
  res.status(err.status).json(err)

});

app.use(function(req, res, next) {
  return res.status(404).send({ message: 'Route '+req.url+' Not found.', code: 404, error_code: "not_found" });
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!')
});
