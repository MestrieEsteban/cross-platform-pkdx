import React, { Component } from "react";
import typePoke from "./typePokemon";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Button, ThemeProvider, Input } from "react-native-elements";
import * as firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCJGUtC-5BlBP8eX14FuoIjGIuHwOpeeg4",
  authDomain: "react-native-pkdx.firebaseapp.com",
  databaseURL: "https://react-native-pkdx.firebaseio.com", 
  projectId: "react-native-pkdx",
  storageBucket: "react-native-pkdx.appspot.com",
  messagingSenderId: "299448272539",
  appId: "1:299448272539:web:34bd523618092ba1dd283e",
  measurementId: "G-NHBH3CT7MJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          console.log("We are authenticated now!");
        }
      
      });
  }


  signUpUser = (email, password) => {
    try {

        if(this.state.password.length<6){
            alert("Please enter atleast 6 characters")
            return
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)

    } catch (error) {
      console.log(error.toString());
    }
  };

  LoginUser = (email, password) => {
    try {

        if(this.state.password.length<6){
            alert("Please enter atleast 6 characters")
            return
        }
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (user){

        })

    } catch (error) {
      console.log(error.toString());
    }
  };

  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          flex: 0.5,
          flexDirection: "column"
        }}
      >
        <View style={{ flex: 10 }}>
          <Text></Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Input
              placeholder=" Email"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={email => this.setState({ email })}
            />
            <Text></Text>
            <Input
              placeholder=" Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={password => this.setState({ password })}
            />
            <Text></Text>
          </View>
          <Button
            title="Connexion"
            onPress={() =>
              this.LoginUser(this.state.email, this.state.password)
            }
          />
          <Text></Text>
          <Button
            title="Inscription"
            type="outline"
            onPress={() =>
              this.signUpUser(this.state.email, this.state.password)
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16
  },
  name_poke: {
    fontSize: 30,
    textAlign: "center"
  }
});
