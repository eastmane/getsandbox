/**
 * My API Sandbox
 *
 */

// A basic route returning a canned response
Sandbox.define('/test', 'get', function(req, res) {
  res.send({
    message: 'Hello world'
  });
});
