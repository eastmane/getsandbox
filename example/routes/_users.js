/*
 * GET /api/users
 *
 * Parameters (named path params accessible on req.params and query params on req.query):
 *
 */
exports.listUsersIndex = function(req, res) {
  if (req.validationErrors()) {
    return res.json(400, {
      status: "error",
      details: req.validationErrorsJson()
    });
  }

  res.status(200);

  // set response body and send
  res.json({
    data: state.users
  });
};


/*
 * POST /api/users
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * body - body parameter - JSON Tag object
 */
exports.postUsersStore = function(req, res) {
  if (req.validationErrors()) {
    return res.json(400, {
      status: "error",
      details: req.validationErrorsJson()
    });
  }
  req.body.id = state.users.length + 1;

  var d = new Date(msSinceEpoch);
  req.body.created_at = d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate() + 'T' +
    d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds() + '-06:00';

  state.users.push(req.body)

  res.status(200);

  // set response body and send
  res.json({
    data: req.body
  });
};


/*
 * GET /api/users/{users}
 *
 * Parameters (named path params accessible on req.params and query params on req.query):
 *
 * users(type: string) - path parameter - Unique id of the tag
 */
exports.getUsersShow = function(req, res) {
  req.check('users', 'Missing user id').notEmpty();
  if (req.validationErrors()) {
    return res.json(400, {
      status: "error",
      details: req.validationErrorsJson()
    });
  }

  var user = _.find(state.users, function(item) {
    return item.username == req.params.users;
  });

  if (user) {
    res.status(200);
    res.json({
      data: user
    });
  } else {
    return res.json(404, {
      status: "error",
      details: "Not found"
    });
  }
};


/*
 * PUT /api/users/{users}
 *
 * Parameters (body params accessible on req.body for JSON, req.xmlDoc for XML):
 *
 * body - body parameter - JSON Tag object
 * users(type: string) - path parameter - Unique id of the tag
 */
exports.putUsersUpdate = function(req, res) {
  req.check('users', 'No user id').notEmpty();
  req.check('body', 'No content found').notEmpty();
  if (req.validationErrors()) {
    return res.json(400, {
      status: "error",
      details: req.validationErrorsJson()
    });
  }
  var user = _.find(state.users, function(item) {
    return item.id == parseInt(req.params.users);
  });

  if (!user) {
    return res.json(404, {
      status: "error",
      details: "Not found"
    });
  }

  // update the user object
  _merge(state.users, req.body);

  // drop the user and subsequently readd
  state.users = _.reject(state.users, {
    id: req.params.users
  })
  state.users.push(user);

  res.json({
    data: user
  });
};


/*
 * DELETE /api/users/{users}
 *
 * Parameters (named path params accessible on req.params and query params on req.query):
 *
 * users(type: string) - path parameter - Unique id of the tag
 */
exports.deleteUsersDestroy = function(req, res) {
  req.check('users', 'Missing user id').notEmpty();
  if (req.validationErrors()) {
    return res.json(400, {
      status: "error",
      details: req.validationErrorsJson()
    });
  }

  var user = _.find(state.users, function(item) {
    return item.id == parseInt(req.params.users);
  });

  if (!user) {
    return res.json(404, {
      status: "error",
      details: "Not found"
    });
  } else {
    state.users = _.reject(state.users, {
      'id': req.params.users
    });
    res.json(204, '');
  }
};
