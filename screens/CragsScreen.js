import React from 'react';
import { ScrollView, StyleSheet, View, Image} from 'react-native';
import { List, ListItem, Card, Text, Button, Icon } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
import { CardList } from '../components/CardList';

import _ from 'lodash';

import * as actions from '../actions';


export default class CragsScreen extends React.Component {
  static navigationOptions = {
    title:'Crags'
  };
  
  constructor(){
    super();
    this.state={
      //crags=actions.getCrags()
      crags:[],
    }
    actions.getCrags().then((crags) => {
      this.setState({ crags });
      console.log('crags', crags)
    });
  }

  renderBottomNavigation(crag){
    return(
      <View style={styles.cragMenu}>
        <Icon onPress={() => {}}
              raised
              name='location-arrow'
              type='font-awesome'
              color='#37BA91'
              size={30} />
        <Icon onPress={() => {}}
              raised
              name='info'
              type='font-awesome'
              color='#37BA91'
              size={30} />
        <Icon onPress={() => {}}
              raised
              name='thumbs-up'
              type='font-awesome'
              color='#37BA91'
              size={30} />
      </View>
    )
  }

  renderCragRoutes(routes) {
    if (routes) {
      return _.map(routes, (route, index) => {
        return (
          <ListItem
            key={index}
            title={
              <Text>Name: {route.name}</Text>
            }
            subtitle={
              <View style={styles.subtitleView}>
                <Text>{route.grade} - {route.height}m</Text>
              </View>
            }
            // leftIcon={{ name: 'info' }}
            rightIcon={
              <Icon
                raised
                name='info'
                type='font-awesome'
                color='#f50'
                onPress={() =>{}} />
            }
          />
        )
      })
    }
  }

  renderAllCrags() {
    const { crags } = this.state;
    
    if (crags) {
      return _.map(crags, (crag, _id) => {
        return (
          <View key={_id}>
            <Card
              title={crag.name}
              image={require(`../assets/images/unknown.jpg`)}
            >
              { this.renderCragRoutes(crag.routes)}
              { this.renderBottomNavigation(crag)}
            </Card>
          </View>
        )
      })
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List containerStyle={styles.listContainer}>
          {this.renderAllCrags()}
        </List>
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
  listContainer: {
    backgroundColor: "#eaeaea"
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 2
  },
  cragMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
