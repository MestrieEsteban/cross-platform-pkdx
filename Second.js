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

export default class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      shiny: "/"
    };
  }
  componentDidMount() {
    this.PokeType();
    this.PokeDesc();
    this.PokeAbility();
  }
  PokeType() {
    let { id } = this.props.route.params;

    return fetch("https://pokeapi.co/api/v2/pokemon/" + id)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSourceType: responseJson.types
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  PokeDesc() {
    let { id } = this.props.route.params;
    return fetch("https://pokeapi.co/api/v2/pokemon-species/" + id)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSourceDesc: responseJson.flavor_text_entries
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  PokeAbility() {
    let { id } = this.props.route.params;
    return fetch("https://pokeapi.co/api/v2/pokemon/" + id)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSourceAbility: responseJson.abilities
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    const { message } = this.props.route.params;
    const { id } = this.props.route.params;

    return (
      <View
        style={{
          flex: 0.5,
          flexDirection: "column"
        }}
      >
        <View style={{ flex: 10, marginTop: "1%" }}>
          <Text style={styles.name_poke}>
            {message.toUpperCase()} #{id}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (
                this.state.url ==
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
              ) {
                this.setState({
                  url:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back"
                });
              }
              if (
                this.state.url ==
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back"
              ) {
                this.setState({
                  url:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
                });
              }
            }}
            onLongPress={() => {
              if (this.state.shiny == "/") {
                this.setState({
                  shiny: "/shiny/"
                });
              }
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                style={{ width: 200, height: 200 }}
                source={{
                  uri: this.state.url + this.state.shiny + id + ".png"
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FlatList
              data={this.state.dataSourceType}
              numColumns={5}
              renderItem={({ item }) => (
                <Text style={typePoke[item.type.name]}>
                  {item.type.name.toUpperCase()}
                </Text>
              )}
            />
          </View>
          <Text></Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>➖➖➖➖➖➖</Text>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>ABILITY</Text>
            <Text>➖➖➖➖➖➖</Text>
          </View>
          <View>
            <FlatList
            
              data={this.state.dataSourceAbility}
              renderItem={({ item }) => (
                <Text>{item.ability.name.toUpperCase()}</Text>
              )}
            />
          </View>
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
