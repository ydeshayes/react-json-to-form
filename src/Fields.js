import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Field from "./Field";
import ArrayField from "./ArrayField";
import ObjectField from "./ObjectField";

const ChildFieldsLabel = styled.div`margin-top: 20px;`;

const ChildFields = styled.div`margin-left: 20px;`;

const getFieldComponent = type => {
  switch (type) {
    case "array":
      return ArrayField;
    case "object":
      return ObjectField;
    default:
      return Fields;
  }
};

class Fields extends React.Component {
  render() {
    const {
      fields,
      onChange,
      values = {},
      path = [],
      requiredFieldNames = []
    } = this.props;

    return (
      <div>
        {fields &&
          Object.keys(fields).map(fieldName => {
            const childProperties =
              fields[fieldName].additionalProperties ||
              fields[fieldName].items ||
              fields[fieldName];
            const FieldComponent = getFieldComponent(fields[fieldName].type);

            return (
              <div key={fieldName}>
                {childProperties.properties ||
                fields[fieldName].type === "object" ? (
                  <ChildFieldsLabel>
                    {fieldName}{" "}
                    {requiredFieldNames.indexOf(fieldName) !== -1 && "*"}:
                  </ChildFieldsLabel>
                ) : (
                  <Field
                    fieldName={fieldName}
                    hintText={fields[fieldName].type}
                    floatingLabelText={`${fieldName} ${requiredFieldNames.indexOf(
                      fieldName
                    ) !== -1 && "*"}`}
                    value={values[fieldName] || ""}
                    type={fields[fieldName].type}
                    path={path.concat([fieldName])}
                    onChange={v => onChange(fieldName, v, path)}
                  />
                )}
                <ChildFields>
                  {(childProperties.properties ||
                    fields[fieldName].type === "object") && (
                      <FieldComponent
                        keyName={fields[fieldName].key}
                        valueName={fields[fieldName].value}
                        requiredFieldNames={childProperties.required}
                        fields={childProperties.properties}
                        path={path.concat([fieldName])}
                        onChange={onChange}
                        values={values[fieldName]}
                      />
                    )}
                </ChildFields>
              </div>
            );
          })}
      </div>
    );
  }
}

Fields.propTypes = {
  fields: PropTypes.object,
  onChange: PropTypes.func,
  values: PropTypes.object,
  path: PropTypes.array,
  requiredFieldNames: PropTypes.array
};

export default Fields;
