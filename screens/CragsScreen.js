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
      crags:[]
    }
    actions.getCrags().then((crags) => {
      this.setState({crags});
      console.log('crags', crags)
    });
  }

  renderCragRoutes(routes) {
    if (routes) {
      return _.map(routes, (route, index) => {
        return (
          <ListItem
            key={index}
            title={route.name}
            leftIcon={{ name: 'play-arrow' }}
            rightIcon={
              <Icon
                raised
                name='music'
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
        const image = crag.imagePath
        return (
          <View key={_id}>
            <Card
              title={crag.name}
              // image={require(image)}
            >
            <Image
            resizeMode="cover"
            source={{ uri: crag.imagePath }}
          />
                <Button
                  title='Delete Album'
                  raised
                  type='font-awesome'
                  backgroundColor='#f50'
                  name='trash'
                  onPress={() =>{}}
              />
              <Text>{crag.imagePath}</Text>
              { this.renderCragRoutes(crag.routes)}
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

  // render() {
  //   const { crags } = this.state;
  //   return crags.map((item, index) => {
  //     return (
  //       <View style={styles.container}>
  //         <Card
  //           key={index}
  //           title={index + 1 + ". " + item.name}
  //         >
  //           {this.renderCragRoutes(item.routes)}
  //         </Card>
  //       </View>
  //     )
  //   })
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  listContainer: {
    backgroundColor: "#eaeaea"
  }
});
