/*
 * File: /Users/michaelbeeson/Documents/VSCode/squad-force/squad-app/src/apollo-client/login.js
 */

import React, { Component } from "react";

import { Platform, ScrollView, Image, AsyncStorage } from "react-native";

import Hide, {
  ShowWithKeyboard as Show,
} from "react-native-hide-with-keyboard";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Container, Button, Text, View, Icon } from "native-base";
import { compose } from "recompose";
import { Formik } from "formik";
import * as Yup from "yup";
import makeInputGreatAgain, {
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from "react-native-formik";
// import HeaderA from "comcomponents/header-footer/header-a";
import HeaderA from "../components/header-footer/header-a";
import FormikInput from "../components/form/formik-input";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

const MyInput = compose(
  makeInputGreatAgain,
  withNextInputAutoFocusInput,
)(FormikInput);
const logoFF = require("../assets/Logo-FF.png");

const Form = withNextInputAutoFocusForm(View);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Need your email for login")
    .email("Well that's not an email"),
  password: Yup.string()
    .required()
    .min(2, "Pretty sure this will be hacked. Make it longer."),
});

const LoginForm = props => (
  // https://github.com/bamlab/react-native-formik#installation
  <Container>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Hide>
        <Image source={logoFF} style={styles.image} />
      </Hide>
      <Show>
        <HeaderA title="Login" />
      </Show>
      <View style={styles.fillContainer} />

      <Formik
        onSubmit={props.onSubmit}
        validationSchema={validationSchema}
        render={props => (
          <Form>
            <MyInput
              placeholder="email@email.com"
              name="email"
              type="email"
              autoCapitalize="none"
            />
            <MyInput
              placeholder="Password"
              secureTextEntry
              name="password"
              type="password"
              autocapitalize="none"
            />

            <Button
              onPress={props.handleSubmit}
              primary
              block
              style={{ margin: 15, marginTop: 50 }}
            >
              <Text>Login</Text>
            </Button>
          </Form>
        )}
      />
      <Button iconLeft transparent primary onPress={props.onGoToSignup}>
        <Icon name="swap" />
        <Text>Switch to Sign-up</Text>
      </Button>
      {Platform.OS === "ios" && <KeyboardSpacer />}
    </ScrollView>
  </Container>
);

const styles = {
  container: {
    backgroundColor: "black",
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
  },
  fillContainer: {
    flex: 1,
  },
  image: {
    alignSelf: "center",
    resizeMode: "contain",
  },
};
// hi
class Login extends Component {
  handleGoToSignup = () => {
    console.log("handleGoToSignup");
    this.props.history.push("/signup");
  };
  handleSubmit = async (formVariables, { props, setSubmitting, setErrors }) => {
    console.log("handleSubmit: login");

    setSubmitting(true);

    try {
      const response = await this.props.mutate({ variables: formVariables });

      const { auth, error } = response.data.login;

      if (auth) {
        try {
          AsyncStorage.setItem("@squad/token", auth.token);
        } catch (err) {
          console.log("Could not set local storage. AsyncStorage");
        }
      }

      if (error) {
        switch (error.field) {
          case "email":
            setErrors({ email: error.message });
            break;
          case "password":
            setErrors({ password: error.message });
            break;
          default:
            setErrors({ email: "Some unknown error happened." });
            break;
        }
      }
    } catch (err) {
      setErrors({ email: `Error: ${err.message}` });
    }

    setSubmitting(false);
  };

  render() {
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        onGoToSignup={this.handleGoToSignup}
      />
    );
  }
}
const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      error {
        field
        message
      }
      auth {
        token
      }
    }
  }
`;

export default graphql(loginMutation)(Login);
