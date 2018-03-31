import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';

class Decks extends React.Component {
  render() {
    console.log('here we are in Decks...');
    return (
      <View>
        <Text>I am the Deck Screen</Text>
      </View>
    )
  }
}

export default connect()(Decks);