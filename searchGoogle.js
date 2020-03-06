import React, { Component } from "react";
import typePoke from "./typePokemon";
import { StyleSheet, View } from "react-native";
import { Button, SearchBar, Text } from "react-native-elements";
import { WebView } from "react-native-webview";

export default class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  componentDidMount() {}

  updateSearch = search => {
    this.setState({ search });
  };

  searchGoolgle(test) {
      if(test == ''){ return } else { return <WebView source={{ uri: `https://www.google.com/search?q=${test}` }} /> }
  }

  render() {
    const { search } = this.state;

    return (
     
        <View style={{ flex: 10, marginTop: "1%" }}>
          <SearchBar
            placeholder="Search Here..."
            lightTheme
            onChangeText={this.updateSearch}
            value={search}
          />
          {this.searchGoolgle(this.state.search)}
          <View
            style={{ justifyContent: "center", alignItems: "center" }}
          ></View>
        </View>
    );
  }
}
