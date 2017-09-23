import React from "react";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class ObjectField extends React.Component {
  constructor(props) {
    super(props);
    let values = [];

    if (props.values && props.values.length) {
      values = Object.keys(props.values).map(key => ({
        value: props.values[key],
        key
      }));
    }

    this.state = {
      values
    };

    this.addNew = this.addNew.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let values = [];

    if (nextProps.values) {
      values = Object.keys(nextProps.values).map(key => ({
        value: nextProps.values[key],
        key
      }));
    }

    this.setState({
      values
    });
  }

  arrayToObject(state) {
    return state.values.reduce((accumulator, current) => {
      accumulator[current.key] = current.value;

      return accumulator;
    }, {});
  }

  onChange(value, index, key) {
    const newState = { ...this.state };

    newState.values[index][key] = value;

    const object = this.arrayToObject(newState);

    const path = [...this.props.path];
    const fieldName = path.pop();

    this.props.onChange(fieldName, object, path);
  }

  addNew() {
    this.setState(prevState => {
      const newState = { ...prevState };

      newState.values.push({});
      return newState;
    });
  }

  removeItem(index) {
    const path = [...this.props.path];
    const fieldName = path.pop();
    const newState = { ...this.state };

    newState.values.splice(index, 1);

    this.props.onChange(fieldName, this.arrayToObject(newState), path);
  }

  render() {
    const { keyName, valueName } = this.props;
    return (
      <div>
        {Object.keys(this.state.values).map((o, index) => (
          <div key={o.key || index}>
            <TextField
              floatingLabelText={keyName}
              value={o.key}
              onChange={e => this.onChange(e.target.value, index, "key")}
            />
            <TextField
              floatingLabelText={valueName}
              value={o.value}
              onChange={e => this.onChange(e.target.value, index, "value")}
            />
            <RaisedButton
              label="Remove"
              onClick={() => this.removeItem(index)}
            />
          </div>
        ))}
        <br />
        <RaisedButton label="Add new" onClick={this.addNew} />
      </div>
    );
  }
}

export default ObjectField;
