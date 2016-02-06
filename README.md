# loopback-react-webpack

**Note: This example uses `loopback@2.0.0` and `loopback-boot@2.0.0`!**

An example building Loopback SPA using webpack by letting browser build the
lbclient and exposing it to webpack via externals.  Features include:

 - offline data access and synchronization

 - building lbclient with minimal grunt

 - building remaining react SPA with webpack

## Install and Run

0. You must have `node` and `git` installed. It's recommended to have `mongod`
   installed too, so that the data is preserved across application restarts.

1. Clone the repo.

2. `cd loopback-react-webpack`

3. `npm install` - install the root package dependencies.

4. `npm install grunt-cli -g` - skip if you have Grunt CLI already installed.

5. `mongod` - make sure mongodb is running if you want to run with
`NODE_ENV=production`.

6. `grunt watch` - build and run the entire project in development mode.

7.  More steps

## Project layout

The project is composed from multiple components.

 - `common/models/` contains definition of models that are shared by both the server
  and the client.

 - `client/lbclient/` provides an isomorphic loopback client with offline synchronization.
  The client needs some client-only models for data synchronization. These
  models are defined in `client/lbclient/models/`.

 - `client/` is a single-page ReactJS application

 - `server/` is the main HTTP server that brings together all other components.
  Also сontains the REST API server; it exposes the shared models via
  REST API.

## Build

Loopback does not play nicely with webpack, so we use browserify (driven by a very
  minimal gruntfile) to build /cient/lbclient/browser.bundle.js

Webpack will build the SPA react applicatoin and the "client" from Loopback
will simply be an "external"


#### Define a new shared model

The instructions assume the name of the new model is 'MyModel'.

 1. Create a file `models/my-model.json`, put the model definition there.
  Use `models/todo.json` as an example, see
  [loopback-boot docs](http://apidocs.strongloop.com/loopback-boot) for
  more details about the file format.

 2. (Optional) Add `models/my-model.js` and implement your custom model
  methods. See `models/todo.js` for an example.

 3. Add an entry to `rest/models.json` to configure the new model in the REST
  server:

    ```json
    {
      "MyModel": {
        "dataSource": "db"
      }
    }
    ```

 4. Define a client-only model to represent the remote server model in the
  client - create `lbclient/models/my-model.json` with the following content:

    ```json
    {
      "name": "RemoteMyModel",
      "base": "MyModel"
    }
    ```

 5. Add two entries to `lbclient/models.json` to configure the new models
  for the client:

    ```json
    {
      "MyModel": {
        "dataSource": "local"
      },
      "RemoteMyModel": {
        "dataSource": "remote"
      }
    }
    ```



---

[More LoopBack examples](https://github.com/strongloop/loopback-example)
