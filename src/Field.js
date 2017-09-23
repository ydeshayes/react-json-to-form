import React from "react";
import PropTypes from "prop-types";

import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import SelectField from "material-ui/SelectField";

const styles = {
  checkbox: {
    marginTop: 20
  }
};

const Field = ({
  type,
  onChange,
  value = "",
  hintText,
  floatingLabelText,
  fieldName,
  path = []
}) => {
  switch (type) {
    case "list":
      return (
        <SelectField
          floatingLabelText={floatingLabelText}
          value={value}
          onChange={(e, k, v) => onChange(v)}
        />
      );
    case "boolean":
      return (
        <div>
          <input
            type="checkbox"
            style={styles.checkbox}
            label={floatingLabelText}
            onChange={(e, v) => onChange(e.target.checked)}
            value={!!value}
          />
          {floatingLabelText}
        </div>
      );
    default:
      return (
        <TextField
          hintText={type}
          floatingLabelText={floatingLabelText}
          value={value}
          onChange={(e, v) => onChange(v)}
        />
      );
  }
};

Field.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  hintText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  fieldName: PropTypes.string,
  path: PropTypes.array
};

export default Field;
