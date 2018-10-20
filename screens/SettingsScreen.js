import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    
    return (
      <React.Fragment>
        <Button
          title='Navigate to Storage'
          onPress={() => this.props.navigation.navigate('Storage')}
        />
        <ExpoConfigView />
      </React.Fragment>
    );
  }
}
