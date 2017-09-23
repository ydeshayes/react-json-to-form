import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import pick from "object.pick";

import RaisedButton from "material-ui/RaisedButton";

import Fields from "./Fields";

const Layout = styled.div`
  max-height: 50vh;
  overflow-y: scroll;
`;

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.sendRequest = this.sendRequest.bind(this);

    this.state =
      this.props.method !== "post"
        ? pick(props.data || {}, props.fields ? Object.keys(props.fields) : [])
        : {};
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => {
      return nextProps.method !== "post"
        ? pick(
            nextProps.data || {},
            nextProps.fields ? Object.keys(nextProps.fields) : []
          )
        : {};
    });
  }

  sendRequest() {
    alert(JSON.stringify(this.state));
  }

  onChange(fieldName, v, path = [], type = "object") {
    this.setState(prevState => {
      const newState = { ...prevState };
      let pointer = newState;

      path.forEach(p => {
        if (!pointer[p]) {
          // If it's the last in the path, it can be an array
          if(p === path[path.length - 1]) {
            if (type === "object") {
              pointer[p] = {};
            } else {
              pointer[p] = [];
            }
          } else {
            pointer[p] = {}
          }
        }
        pointer = pointer[p];
      });

      pointer[fieldName] = v;

      return newState;
    });
  }

  render() {
    const { fields, requiredFieldNames } = this.props;

    return (
      <div>
        <Layout>
          {(!fields || fields.length === 0) && "No parameters"}
          <Fields
            requiredFieldNames={requiredFieldNames}
            onChange={this.onChange}
            fields={fields}
            values={this.state}
          />
        </Layout>
        <RaisedButton label="Send" onClick={this.sendRequest} />
      </div>
    );
  }
}

Form.propTypes = {
  fields: PropTypes.object,
  requiredFieldNames: PropTypes.array,
  data: PropTypes.object,
  href: PropTypes.string,
  method: PropTypes.string
};

export default Form;
