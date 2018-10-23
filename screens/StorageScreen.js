import React from 'react';
import { ScrollView, StyleSheet, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';

import * as actions from '../actions';

export default class StorageScreen extends React.Component {
  static navigationOptions = {
    title: 'Storage',
  };

  constructor(){
      super();
      this.state = {
          value: ''
      }
  }

  async storeData(){
    console.log('stored');

    const data={
        value:'Some awesome value'
    }

    const value = await actions.storeData('someKey', data);
    if(value){
        console.log('Svalue: ', value);
    }
  }

  async retrieveData(){
    this.setState({
        value:''
    });
    console.log('retrieved');
    const data = await actions.retrieveData('favoriteAlbums');
    if(data){
        console.log('Rvalue: ', data);
        // this.setState({
        //     value:data.value
        // });
    };
  }

  async removeData(){
    const value = await actions.removeData();
      if (value) {
          this.setState({
              value: ''
          });
      }
  }

  render() {
      const {value} = this.state
    return (
      <ScrollView style={styles.container}>
        <View>
            <Text>Storage Screen</Text>
        </View>
        <Button
          title='Store Date'
          onPress={() => {this.storeData()}}
        />
        <Button
          title='Retrieve Data'
          onPress={() => {this.retrieveData()}}
        />
        <Button
          title='Remove Data'
          onPress={() => {this.removeData()}}
        />
        <Text h4>{value}</Text>

        <Divider style={{ backgroundColor: "black" }} />

        <View style={styles.centerItems}>
          <Text h3>Touchables</Text>
          <TouchableHighlight onPress={() => { }} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>TouchableHighlight</Text>
            </View>
          </TouchableHighlight>
          <TouchableOpacity onPress={this._onPressButton}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>TouchableOpacity</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  centerItems:{
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3"
  },
  buttonText: {
    padding: 20,
    color: "white"
  }
});
