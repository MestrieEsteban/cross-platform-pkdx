import React, { Component } from "react";
import typePoke from "./typePokemon";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    ListItem
} from "react-native";
import { Button, ThemeProvider, Input } from "react-native-elements";
import firebaseApp from "./firebase"
import _ from 'lodash';



export default class Second extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            pokemon: [],
            loading: true


        };
    }
    componentDidMount() {
        this.showFavorit()
    }

    showFavorit() {
        var user = firebaseApp.auth().currentUser.uid
        firebaseApp.database().ref('users/' + user).once('value', (data) => {
            const pokemon = _.map(data.val(), (poke) => {
                return { poke }
            });
            this.setState({ pokemon:pokemon, loading: false })
        })


    }
    

    renderItem({ item }) {
        console.log(item);
        if(item)
        {
            return (
                
                <Text
                      style={styles.l_pokemon}
                      numColumns={2}
                      onPress={() =>
                        this.props.navigation.navigate("Détails", {
                          message: item.poke.name,
                          id: item.poke.id
                        })
                      }
                    >
                      <Image
                        style={{ width: 100, height: 100 }}
                        source={{
                          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.poke.id}.png`
                        }}
                      />
                      {"\n"}
                      {"\n"}
                      {item.poke.name}
                    </Text>
            )
        }
    }


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
                    <View style={{ flex: 10 }}>
                        <FlatList
                            data={this.state.pokemon}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.uid}
                        />

                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            title="Déconnexion"
                            type="outline"
                            onPress={() =>
                                firebaseApp.auth().signOut().then(function () {
                                    alert('Déconnecté')
                                })}
                        ></Button>
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
