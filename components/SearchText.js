import React from 'react';
import { StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'

export class SearchText extends React.Component {

  constructor(){
    super();
    this.state = {
      value: ''
    }
  }

  componentDidMount(){
    this.input.focus();
  }

  onChange(value){
    this.setState({value});
  }

  onSubmitSearch(){
    const { submitSearch } = this.props;
    submitSearch(this.state.value);
  }

  render() {
    return (
      <React.Fragment>
        <FormLabel containerStyle={styles.center}>Search...</FormLabel>
        <FormInput ref={input => this.input = input} onChangeText={(event) => {this.onChange(event) }} />
        <Button title='Search' onPress={() => {this.onSubmitSearch() }} />
      </React.Fragment>
    )
  }
}


const styles = StyleSheet.create({
  center:{
    alignItems:'center'
  }
})