/*
 * File: /Users/michaelbeeson/Documents/VSCode/squad-force/squad-app/src/entry.js
 */
import React from "react";
import { Component } from "react";
import * as Expo from "expo";
//import Nativebase from "./nativebase";
// import { Text } from "react-native";

import Apollo from "./apollo";

class Entry extends Component {
  debugger;
  render() {
    console.log("Entry.js reached in App.");
    return <Apollo />;
    // return (
    //   <Text>
    //     test it has an endpoint
    //   </Text>
    // );
  }
}

export default Expo.registerRootComponent(Entry);
