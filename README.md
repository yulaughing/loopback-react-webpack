# loopback-react-webpack

An example building Loopback SPA using webpack by letting browserify build the loopback-client and exposing it to webpack via webpack's "externals" options.

## Install and Run

0. You must have `node` and `git` installed. It's recommended to have `mongod`
   installed too, so that the data is preserved across application restarts.

1. Clone the repo.

2. `cd loopback-react-webpack`

3. `npm install` - install the root package dependencies.

4. `npm install grunt-cli -g` - skip if you have Grunt CLI already installed.

6. `npm run build`

7.  slc arc

8.  From slc arc hit the "Play button" in upper right and follow link to http://localhost:3000

## Project layout

The project is composed from multiple components.

 - `common/models/` contains definition of models that are shared by both the server and the client.

 - `app/` Single Page App built with Webpack.  Able to require 'loopback-client' thanks to webpack's externals option.

 - `client/` Loopback isomorphic client built with browserify.  Made available to Single Page App via Webpack's externals option.

 - `server/` is the main HTTP server that brings together all other components.
  Also сontains the REST API server; it exposes the shared models via
  REST API.

## Build

Loopback does not play nicely with webpack, so we use browserify (driven by a very minimal gruntfile) to app/browser.bundle.js

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
