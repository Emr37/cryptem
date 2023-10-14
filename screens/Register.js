import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { LoginSchema } from "../components/Validations";
import authStore from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const { register, auth } = authStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        console.log("user Id token", user.getIdToken);
        AsyncStorage.setItem("user", JSON.stringify(user));

        navigation.navigate("Wallet");
      }
    });

    return unsubscribe;
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, resetForm, setFieldValue } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      register(values);

      resetForm();
    },
    validationSchema: LoginSchema,
  });

  return (
    <KeyboardAvoidingView showsVerticalScrollIndicator={false} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.inputContainer}>
            <TextInput
              name="email"
              placeholder="E-Mail"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.errorContainer}>{errors.email && touched.email && <Text style={styles.error}>* {errors.email}</Text>}</View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              name="password"
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={styles.input}
              autoCapitalize="none"
              secureTextEntry
            />
            <View style={styles.errorContainer}>{errors.password && touched.password && <Text style={styles.error}>* {errors.password}</Text>}</View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  inputContainer: {
    width: "80%",
    marginBottom: 16,
    borderColor: "#eee",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 8,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  input: {
    height: 32,
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 8,
    width: "100%",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#cda540",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderColor: "#cda540",
    borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonOutlineText: {
    color: "#cda540",
    fontWeight: "700",
    fontSize: 16,
  },
  error: {
    color: "#FF0000",
    fontSize: 10,
    position: "absolute",
  },
  errorContainer: {
    marginBottom: 5,
  },
  info: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 24,
    color: "#cda540",
  },
});
