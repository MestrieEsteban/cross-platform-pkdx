import React, {Component} from 'react';
import {StyleSheet, View, Button, TextInput} from 'react-native';


export default class First extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        const {message} = this.props.route.params;
        

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <View style={{flex: 10, marginTop: '1%'}}>
                    <TextInput
                        style={{height: 40, width: 300}}
                        onChangeText={(text) => this.setState({text})}
                        value={message}
                    />
                </View>
                <View style={{flex: 1}}>
                    <Button title="Previous Page" onPress={() => navigate("First", {text_2: this.state.text})}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#DBDBD6',
    },
});