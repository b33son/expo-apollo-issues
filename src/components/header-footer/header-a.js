/*
 * File: /Users/michaelbeeson/Documents/VSCode/squad-force/squad-app/src/components/header-footer/header-a.js
 */
import React from "react";

import { Image } from "react-native";
import { Header, Title, Body, Left, Right } from "native-base";
const HeaderA = ({ params, title }) => (
  <Header style={{ height: 100 }}>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right>
      <Image
        style={{ width: 50, height: 50 }}
        source={require("src/assets/Logo-97.png")}
      />
    </Right>
  </Header>
);

export default HeaderA;
