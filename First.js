import React, { Component } from "react";
import { StyleSheet, View, Button, TextInput, Text, FlatList } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";



export default class First extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      test: "test"
    };
  }

  componentDidMount(){
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <View style={{ flex: 10, marginTop: "1%" }}>
          <View style={{ flex: 1, paddingTop: 20 }}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <Text style={styles.l_pokemon} onPress={() => navigate("Second", { message: item.url })}>
                  {item.name}
                </Text>
              )}
              keyExtractor={({ id }, index) => id}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="Next Page"
            onPress={() => navigate("Second", { message: this.state.message })}
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
  input: {
    width: 200,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#DBDBD6"
  },
  l_pokemon:{
    fontSize: 20,
    backgroundColor: "#1b262c",
    color: "white",
    borderWidth: 1,
    borderColor: "white",

  }
});
