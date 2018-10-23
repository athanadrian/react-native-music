import React from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { List, ListItem, Card, Text, Button, Icon } from 'react-native-elements';
import _ from 'lodash'; 


import * as actions from '../actions';

export default class FavoriteScreen extends React.Component {
  static navigationOptions = {
    title: 'Favorite Albums',
  };

  constructor() {
    super();

    this.state = {
      favoriteAlbums: undefined
    }

    this.getFavoriteAlbums();
  }

  
  async getFavoriteAlbums() {
    const favoriteAlbums = await actions.retrieveData("favoriteAlbums");
    //debugger
    if (favoriteAlbums) {
      this.setState({ favoriteAlbums });
    }
  }

  async deleteAlbum(albumId){
    const { favoriteAlbums } = this.state;

    delete favoriteAlbums[albumId];
    const success = await actions.storeData('favoriteAlbums', favoriteAlbums);
    
    if (success) {
      Alert.alert(
        'Delete Album',
        `Album has been deleted.`,
        [
          { text: 'Keep on going...', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
      this.setState({favoriteAlbums});
    }
  }

  renderFavoriteTracks(tracks) {
    if (tracks) {
      return _.map(tracks, (track, id) => {
        return (
          <ListItem
            key={id}
            title={track.title}
            leftIcon={{ name: 'play-arrow' }}
            rightIcon={
              <Icon
                raised
                name='music'
                type='font-awesome'
                color='#f50'
                onPress={() => Linking.openURL(track.preview)} />
            }
          />
        )
      })
    }
  }

  renderFavoriteAlbums() {
    const { favoriteAlbums } = this.state;

    if (favoriteAlbums) {
      return _.map(favoriteAlbums, (album, id) => {
        return (
          <View key={id}>
            <Card
              title={album.title}>
                <Button
                  title='Delete Album'
                  raised
                  type='font-awesome'
                  backgroundColor='#f50'
                  name='trash'
                  onPress={() => this.deleteAlbum(album.id)}
              />
              { this.renderFavoriteTracks(album.tracks)}
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
          {this.renderFavoriteAlbums()}
        </List>
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
  listContainer: {
    backgroundColor: "#eaeaea"
  }
});
