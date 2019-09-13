import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Platform
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import Constants from "expo-constants";

const Login = ({ navigation }) => {
  const biometrics = async () => {
    const os = Platform.OS;
    const deviceName = Constants.deviceName;
    let result;

    let enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      alert("Biometrics are not yet set up on your device.");
    }

    if (os === "ios" && deviceName === "iPhone X") {
      result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Hold phone still."
      });
      result.success
        ? navigation.navigate("Home")
        : alert("Face Recognition Auth Failed");
    }

    alert("Scan your finger now");
    result = await LocalAuthentication.authenticateAsync({});
    result.success
      ? navigation.navigate("Home")
      : alert("FingerPrint Auth Failed");
  };

  const authInformation = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    console.log("compatible", compatible);

    let kindsOfAuth = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log("kinds of auth", kindsOfAuth);

    let isEnrolled = await LocalAuthentication.isEnrolledAsync();
    console.log("enrolled", isEnrolled);

    let authenticate = LocalAuthentication.authenticateAsync();
    console.log("authenticate", authenticate);
    console.log("device name", Constants.deviceName);
  };
  authInformation();

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType="email-address"
        placeholder="email"
        placeholderTextColor="white"
        style={styles.input}
      />
      <TextInput
        placeholder={"password"}
        secureTextEntry={true}
        placeholderTextColor="white"
        style={styles.input}
      />

      <TouchableOpacity onPress={biometrics} style={styles.button}>
        <Text>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3C4A61"
  },
  titleText: {
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "powderblue",
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: 200,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 10
  }
});

export default Login;
