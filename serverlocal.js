const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
var serveStatic = require('serve-static');
const path = require('path');
// Instantiate express
const app = express();
// Set our port
const port = process.env.PORT || 8000;
// Configure app to user bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

// Register our routes in app
app.use('/api', routes);
// app.use('/', serveStatic(path.join(__dirname, 'frontend/dist')))

// app.get(/.*/, function (req, res) {
//     res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
// })

// Start our server
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });
// Export our app for testing purposes
// export default app;

module.exports = app