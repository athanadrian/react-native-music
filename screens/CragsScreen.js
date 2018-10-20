import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
import { CardList } from '../components/CardList';
import * as actions from '../actions';


export default class CragsScreen extends React.Component {
  static navigationOptions = {
    title:'Crags'
  };
  
  constructor(){
    super();
    this.state={
      //crags=actions.getCrags()
      crags:[]
    }
    actions.getCrags().then((crags) => this.setState({crags}));
  }

  render() {
    const { crags } = this.state;
    return (
      <ScrollView style={styles.container}>
        <CardList 
            data={crags} 
            titleKey={'name'} 
            imageKey={'imagePath'}
            buttonText='See Details'></CardList>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
