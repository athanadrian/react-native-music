import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';

export default class PaymentsScreen extends React.Component {
  static navigationOptions = {
    title: 'Payments',
  };

  state={
    title:'Hello'
  }

  // changeCardName=()=>{
  //   this.setState({
  //     title:'I changed it!'
  //   })
  // }

  render() {
    const cardName = this.state.title;
    return (
      <ScrollView style={styles.container}>
        <Card
          title={cardName}>
          <Text style={{marginBottom: 10}}>
            The idea with React Native Elements is more about component structure than actual design.
          </Text>
          <Button
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
            {/* <Button
            icon={{name: 'code'}}
            backgroundColor='red'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            onPress={this.changeCardName}
            title='Change Card Name' /> */}
        </Card>
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
