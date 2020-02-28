import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  FlatList,
  Image
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

export default class First extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      test: "test"
    };
  }

  componentDidMount() {
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.results
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
    return (
      <View
        style={{
          flex: 1,
          alignContent:"center",
          flexDirection: "column",
        }}
      >
        <View style={{ flex: 10}}>
          <View style={{ flex: 1, margin: 5, backgroundColor: '#ddd', height: 130}}>
            <FlatList
                style={{margin:5}}
              data={this.state.dataSource}
              numColumns={2}
              renderItem={({ item }) => (
                <Text style={styles.l_pokemon}
                  onPress={() => navigate("Détails", { 
                      message: item.name,
                      id: item.url.split('/')[6] 
                    
                    })}
                >
                  <Image
                    style={{ width: 100, height: 100}}
                    source={{
                      uri:
                        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(item.url).split('/')[6]}.png`
                    }}
                  />
                 {'\n'}  
                 {'\n'}  
                 {item.name}         
                </Text>
              )}
              
              />
          </View>
        </View>
        <View style={{ flex: 1 }}>
           <Text>Esteban Mestrie</Text>
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
  input: {
    width: 200,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#DBDBD6"
  },
  l_pokemon: {
    fontSize: 20,
    width: '50%',
    backgroundColor: "white",
    color: "black",
    borderWidth: 0.5,
    borderColor: "black",
    alignContent: "center",
    textAlign: "center",
    marginBottom: 10
  }
});
