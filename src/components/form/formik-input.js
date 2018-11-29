/*
 * File: /Users/michaelbeeson/Documents/VSCode/squad-force/squad-app/src/components/form/nativebase-input.js
 */

import React from "react";
import { Text, View, Input, Item } from "native-base";
// import { TextField } from 'react-native-material-textfield';

export default class FormikInput extends React.PureComponent {
  // Your custom input needs a focus function for `withNextInputAutoFocus` to work
  focus() {
    // https://github.com/GeekyAnts/NativeBase/issues/70
    this.input._root.focus();
  }

  render() {
    const { error, touched, ...props } = this.props;

    const displayError = !!error && touched;
    const errorColor = "rgb(239, 51, 64)";

    return (
      <React.Fragment>
        {!displayError && (
          <Item>
            <Input ref={input => (this.input = input)} {...props} />
          </Item>
        )}
        {displayError && (
          <Item error>
            <Input ref={input => (this.input = input)} {...props} />
          </Item>
        )}
        {displayError && (
          <Text
            style={{
              textAlign: "right",
              //color: displayError ? errorColor : "transparent",
              height: 20
            }}
          >
            {error}
          </Text>
        )}
      </React.Fragment>
    );
  }
}
