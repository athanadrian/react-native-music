import React from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Card, Text, Button, Icon } from 'react-native-elements';

// COMPONENTS
import { CardList } from '../components/CardList';
import { SearchText } from '../components/SearchText';

import * as actions from '../actions';

export default class AlbumsScreen extends React.Component {
  static navigationOptions = {
    title:'Albums'
  };

  constructor(){
    super()
    this.state = {
      albums: [],
      isFetching: false,
      artist:''
    }

    this.getAlbums = this.getAlbums.bind(this);
    this.renderBottomNavigation = this.renderBottomNavigation.bind(this);
  }

  getAlbums(artist) {
    this.setState({ isFetching: true, albums: [], artist })
    actions.searchAlbums(artist)
      .then((albums) => {
        this.setState({ albums, isFetching: false })
      })
      .catch((error) => {
        this.setState({
          albums: [], isFetching: false
        });
      });
  }
  
  // render() {
  //   const albums = this.state.albums;
  //   return (
  //     <ScrollView style={styles.container}>
  //     {
  //       albums.map((album, index)=>{
  //         return (
  //           <Card
  //             key={index}
  //             title={index+1 + '. ' + album.title}
  //             image={{uri:album.cover}}>
  //             <Text style={{marginBottom: 10}}>
  //               The idea with React Native Elements is more about component structure than actual design.
  //             </Text>
  //             <Button
  //               icon={{name: 'code'}}
  //               backgroundColor='#03A9F4'
  //               buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
  //               title='VIEW NOW' />
  //           </Card>
  //         )
  //       })
  //     }
  //     </ScrollView>
  //   );
  // }

  async saveAlbumToFavorite(album){
    const favoriteAlbums = await actions.retrieveData("favoriteAlbums") || {};

    if (favoriteAlbums[album.id]) {
      Alert.alert(
        'Cannot add album',
        `Album ${album.title} already exists in favorites.`,
        [
          { text: 'Keep on going...', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
      return false;
    }

    favoriteAlbums[album.id] = album;
    const success = await actions.storeData('favoriteAlbums', favoriteAlbums);

    if (success) {
      console.log('suc', success);
      Alert.alert(
        'Album added',
        `Album ${album.title} from ${this.state.artist} was added too favorites.`,
        [
          { text: 'Keep on going...', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    }

  }

  // cleaner way to render data

  renderBottomNavigation(album){
    const { artist } = this.state;
    return(
      <View style={styles.albumMenu}>
        <Icon onPress={() => {}}
              raised
              name='play'
              type='font-awesome'
              color='#f50'
              size={30} />
        <Icon onPress={() => { this.props.navigation.navigate('AlbumDetail', {album, artist}) }}
              raised
              name='info'
              type='font-awesome'
              color='#f50'
              size={30} />
        <Icon onPress={() => this.saveAlbumToFavorite(album)}
              raised
              name='thumbs-up'
              type='font-awesome'
              color='#f50'
              size={30} />
      </View>
    )
  }

  renderAlbums() {
    const { albums, isFetching } = this.state;
    return (
      <ScrollView style={styles.container}>
        <SearchText submitSearch={this.getAlbums}></SearchText>

        {albums.length > 0 && !isFetching &&
          <CardList data={albums}
            imageKey={'cover_big'}
            titleKey={'title'}
            //buttonText="See the detail"
            bottomView={this.renderBottomNavigation}>
          </CardList>
        }
        {albums.length === 0 && isFetching &&
          <View> <Text> loading data......</Text></View>
        }
      </ScrollView>
    );
  }

  render(){
    return this.renderAlbums();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  albumMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
