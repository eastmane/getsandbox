/**
 * My API Sandbox
 *
 */

/*
 * Mock data initialization:
 */
state.users = state.users || require("./data/users.js").users.data;

/*
 * Mock data initialization:
 */
var _users = require("./routes/_users.js");

/* Route definition styles:
 *
 *	define(path, method, function)
 *
 */

Sandbox.define("/api/users", "GET", _users.listUsersIndex);
Sandbox.define("/api/users", "POST", _users.postUsersStore);
Sandbox.define("/api/users/{users}", "GET", _users.getUsersShow);
Sandbox.define("/api/users/{users}", "PUT", _users.putUsersUpdate);
Sandbox.define("/api/users/{users}", "DELETE", _users.deleteUsersDestroy);
