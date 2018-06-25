const express = require('express');
const app = express();
const path = require('path');
const SwaggerExpress = require('swagger-express-mw');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');
const PORT = process.env.PORT || 8080;
const config = {
  appRoot: path.join(__dirname, '../') // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
});

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//API Routes
app.use('/api', require('./apiRoutes'));

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

db.sync()
.then(function() {
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
})
.catch(console.error);
