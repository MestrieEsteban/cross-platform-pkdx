import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import { Button, ThemeProvider, Input, SearchBar } from "react-native-elements";
import firebaseApp from "./firebase"
import _ from 'lodash';
import { Logs } from "expo";



export default class First extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      test: "test",
      dataSource: [],
      data: [],
      error: null,
      loggedIn: false,
      loading: true,
      text: '',
    };
  }

  componentDidMount() {
    this.listPokemon()
    this.testConnect()
  }

  listPokemon() {
    this.setState({ loading: true })
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then(response => response.json())
      .then(responseJson => {

        this.setState(
          {
            loading: false,
            dataSource: responseJson.results
          },
          function () { }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  testConnect() {
    this.setState({ loading: true })
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true })
        this.setState({ loading: false })


        this.props.navigation.navigate('Liste Pokemon')
      } else {
        this.setState({ loggedIn: false })
        this.setState({ loading: false })
        this.props.navigation.navigate('Connexion / Inscription')
      }
    })
  }

  searchInData = text => {
    this.setState({ loading: true })

    const newData = this.state.dataSource.filter(item => {

      const itemData = `${item.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;

    });
    this.setState({ loading: false })

    this.setState({ dataSource: newData });
    this.setState({ text });
  };


  render() {
    const { navigate } = this.props.navigation;
    if (this.state.loading) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )
    } else {

      return (
        <View
          style={{
            flex: 1,
            alignContent: "center",
            flexDirection: "column"
          }}
        >
          <SearchBar
            placeholder="Search Pokemon..."
            lightTheme
            onChangeText={text => this.searchInData(text)}
            value={this.state.text}
          />
          <View style={{ flex: 10 }}>
            <View
              style={{ flex: 1, margin: 5, backgroundColor: "#ddd", height: 130 }}
            >
              <FlatList
                style={{ margin: 5 }}
                data={this.state.dataSource}
                numColumns={2}
                renderItem={({ item }) => (
                  <Text
                    style={styles.l_pokemon}
                    onPress={() =>
                      navigate("Détails", {
                        message: item.name,
                        id: item.url.split("/")[6]
                      })
                    }
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                          item.url.split("/")[6]
                          }.png`
                      }}
                    />
                    {"\n"}
                    {"\n"}
                    {item.name}
                  </Text>
                )}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {this.state.loggedIn ?
              <Button
                title="My profil"
                onPress={() =>
                  this.props.navigation.navigate('Profil')
                }
              ></Button>
              :
              <Button
                title="Connexion / Inscription"
                onPress={() =>
                  this.props.navigation.navigate('Connexion / Inscription')
                }
              ></Button>
            }

          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16
  },

  l_pokemon: {
    fontSize: 20,
    width: "50%",
    backgroundColor: "white",
    color: "black",
    borderWidth: 0.5,
    borderColor: "black",
    alignContent: "center",
    textAlign: "center",
    marginBottom: 10
  }
});
