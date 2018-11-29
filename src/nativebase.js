/*
 * File: /Users/michaelbeeson/Documents/VSCode/squad-force/squad-app/src/native-base.js
 */

import React from "react";
import { Component } from "react";
import { Root, Container, Text, StyleProvider } from "native-base";
import { Font, AppLoading } from "expo";
import getTheme from "./native-base-theme/components";
import squadColor from "./native-base-theme/variables/squadColor";
import Apollo from "./apollo";

const robotoFont = require("./assets/fonts/Roboto.ttf");
const robotoFontMedium = require("./assets/fonts/Roboto_medium.ttf");

export default class Nativebase extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: robotoFont,
      Roboto_medium: robotoFontMedium,
    });
    this.setState({ loading: false });
  }

  render() {
    debugger;
    if (this.state.loading) {
      return (
        <Root>
          <Text>Loading...</Text>
        </Root>
      );
    }
    return (
      <StyleProvider style={getTheme(squadColor)}>
        <Container style={{ backgroundColor: "#FcFcFc" }}>
          <Apollo />
        </Container>
      </StyleProvider>
    );
  }
}
