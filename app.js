const app = require("express")();
const Githook = require("git-hook");
const bodyParser = require('body-parser');

app.use(bodyParser.json({
  limit: '1mb'
}));


var githook = new Githook({
  gitlab: {
    secret: 'abcdefg',
    token : 'abcdefg'
  }
});

// bind a route to githook, eg. express 4.0
app.post('/gitlab', function (req, res) {
  githook.handleEvent('gitlab', {
    ip: githook.determineIP(req),
    headers: req.headers,
    body: req.body
  }, function (err) {
    if (err) {
      res.send(400, 'Event not supported');
    } else {
      res.end();
    }
  });
});

// wait for git events
githook.on('push', function (eventdata) {
  // do your magic here
  console.log("push :", eventdata);
});

const port = process.env.PORT || '3010';
app.set('port', port);
var http = require('http');
const server = http.createServer(app);
server.listen(port);

