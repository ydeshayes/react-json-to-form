import React from "react";
import PropTypes from "prop-types";

import Fields from "./Fields";
import RaisedButton from "material-ui/RaisedButton";

class ArrayField extends React.Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(index) {
    const path = [...this.props.path];
    const fieldName = path.pop();
    const array = [...this.props.values];

    array.splice(index, 1);

    this.props.onChange(fieldName, array, path, "array");
  }

  render() {
    const {
      requiredFieldNames,
      fields,
      path,
      onChange,
      values = []
    } = this.props;

    return (
      <div>
        {values.map((value, index) => (
          <div key={`${path.join("/")}/${index}`}>
            <Fields
              requiredFieldNames={requiredFieldNames}
              fields={fields}
              path={path.concat([index])}
              onChange={onChange}
              values={value}
            />
            <RaisedButton
              label="Remove"
              onClick={() => this.removeItem(index)}
            />
          </div>
        ))}
        <br />
        <RaisedButton
          label="Add new"
          onClick={() => onChange(values.length, {}, path, "array")}
        />
      </div>
    );
  }
}

ArrayField.propType = {
  requiredFieldNames: PropTypes.array,
  fields: PropTypes.object,
  path: PropTypes.array,
  onChange: PropTypes.func,
  values: PropTypes.array
};

export default ArrayField;
