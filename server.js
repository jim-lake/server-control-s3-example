const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serverControl = require('server-control-s3');

const { version } = require('./package.json');

const port = parseInt(process.env.port || '3000');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(new Date(), '/');
  res.send('Hello World!');
});
app.get('/version', (req, res) => {
  console.log(new Date(), '/version');
  res.send({ version });
});
app.get('/dump', (req, res) => {
  console.log(new Date(), '/dump');
  res.send({
    header: req.headers,
    query: req.query,
    body: req.body,
    cookies: req.cookies,
  });
});

const opts = {
  secret: 'my-super-secret-key',
  port: 80,
  remote_repo_prefix: 's3://server-control-s3-example/example-app',
};
serverControl.init(app, opts);

app.listen(port, () => {
  console.log(`Server Control s3 Example listening on port ${port}`);
});
