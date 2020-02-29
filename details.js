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
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import firebaseApp from "./firebase"


export default class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      shiny: "/",
      test: ''
    };
  }
  componentDidMount() {
    this.PokeType();
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
          function () { }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  PokeDesc(name) {
    if (this.state.description === undefined) {
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + name)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.flavor_text_entries[1].flavor_text);
        this.setState(
          {
            description : responseJson.flavor_text_entries[1].flavor_text
          },
          function () { }
        );
        
      })
      .catch(error => {
        console.error(error);
      });
    }
    return <Text style={{textAlign: "center"}}>{this.state.description}</Text>
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
          function () { }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  addToFavorit(id, name) {
    var user = firebaseApp.auth().currentUser.uid
    firebaseApp.database().ref('users/' + user + '/' + id).set({
      name: name,
      id: id
    }).then(() => {
      alert('Ajouté au favoris');
    }).catch((error) => {
      alert(error);

    })
  }
  descAbility(name) {
    if (this.state[name] === undefined) {
      fetch("https://pokeapi.co/api/v2/ability/" + name)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ [name]: responseJson.effect_entries[0].effect })

        })
        .catch(error => {
          console.error(error);
        });
      return
    } else {
      return <Text>{this.state[name]}</Text>

    }
  }


  render() {
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
          <TouchableOpacity onPress={() =>
            this.addToFavorit(id, message)}>
            <Text style={styles.pokeFavo}>
              ⭐
          </Text>
          </TouchableOpacity>
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
              numColumns={2}
              renderItem={({ item }) => (
                <Text style={typePoke[item.type.name]}>
                  {item.type.name.toUpperCase()}
                </Text>
              )}
            />
          </View>
          <Text></Text>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {this.PokeDesc(message)}
          </View>
          <Text></Text>
          <View>
            <FlatList

              data={this.state.dataSourceAbility}
              renderItem={({ item }) => (
                <Card
                  title={item.ability.name.toUpperCase()}>
                  <Text style={{ marginBottom: 10 }}>
                    {this.descAbility(item.ability.name)}
                  </Text>
                </Card>
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
  },
  pokeFavo: {
    fontSize: 20,
    textAlign: "center"
  }
});
