var githook = new Githook({
  gitlab: {
    secret: 'abcdefg',
    token : 'abcdefg'
  }
});

// bind a route to githook, eg. express 4.0
app.post('/github', function (req, res) {
  debug('github event');
  gh.handleEvent('github', {
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
