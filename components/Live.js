import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';

class Live extends React.Component {
  render() {
    console.log('here we are in Decks...');
    return (
      <View>
        <Text>I am the Live Screen</Text>
      </View>
    )
  }
}

export default Live;