import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form";
// import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

/*const fields = {
    "user": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "role": {
      "type": "string"
    }
};

const required = [
  "user",
  "email",
  "role"
];*/

const fields = {
  name: {
    type: "string"
  },
  title: {
    type: "string"
  },
  parent: {
    type: "string"
  },
  deployment_target: {
    type: "string"
  },
  http_access: {
    properties: {
      is_enabled: {
        type: "boolean"
      },
      addresses: {
        items: {
          properties: {
            permission: {
              type: "string"
            },
            address: {
              type: "string"
            }
          },
          required: ["permission", "address"]
        },
        type: "array"
      },
      basic_auth: {
        key: "login",
        value: "password",
        additionalProperties: {
          type: "string"
        },
        type: "object"
      }
    },
    required: ["is_enabled", "addresses", "basic_auth"]
  },
  enable_smtp: {
    type: "boolean"
  },
  restrict_robots: {
    type: "boolean"
  }
};

const required = [
  "name",
  "title",
  "parent",
  "deployment_target",
  "http_access",
  "enable_smtp",
  "restrict_robots"
];

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Form fields={fields} requiredFieldNames={required} />
  </MuiThemeProvider>,
  document.getElementById("app")
);
// registerServiceWorker();
