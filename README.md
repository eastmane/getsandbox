# Dockerized Sandbox Runtime

This is a Dockerized version of the [Sandbox](https://getsandbox.com/) runtime suitable for local testing. For more information on Sandbox, please visit the website at [https://getsandbox.com/](https://getsandbox.com/).

## Running

The Sandbox server will start on port 8080 using the default `main.js` [Sandbox API](https://getsandbox.com/docs/sandbox-api) definition.

```
docker run --name sandbox \
  -p 8080:8080 \
  eastmane/getsandbox
```

You can access the api by directing your browser to `http://<docker_host>/test`.

## Development

In order to publish your own definition, mount your own definition file in the `/sandbox` directory.

The following command will start a sandbox container and serve the example/main.js mock api definition.

```
docker run --name sandbox \
  -p 8080:8080 \
  -v $(pwd)/example:/sandbox \
  eastmane/getsandbox
```

> _Note_: To include external dependencies into your test suite, just include them in the mounted directory and reference them as relative paths to the /sandbox directory.
