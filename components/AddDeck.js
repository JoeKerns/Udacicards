import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { saveDeck } from '../actions/actions';
import { deckSaveToAsync } from '../utils/api';
import { orange } from '../utils/colors';

class AddEntry extends React.Component {
  state = {
    deckName: null,
  }
  render() {
    const { dispatch, navigation } = this.props;

    const updateDeck = (deckName) => {
      this.setState({
        deckName
      });
    }   

    const saveNewDeck = () => {
      const deckName = this.state.deckName !== null ? this.state.deckName : '';
      const newDeck = {
        [deckName]: {
          title: deckName,
          questions: []
        }
      };
      dispatch(saveDeck(newDeck));
      deckSaveToAsync(newDeck);
      alert(`${deckName} added!`);
      navigation.navigate('DeckDetails', { title: deckName });
    }

    return (
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} behavior="padding">
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Deck Name</Text>
                  
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 2, width: '60%', padding: 12 }}
          onChangeText={deckName => updateDeck(deckName)}
          value={this.state.deckName}
          autoCorrect={false}
          underlineColorAndroid='transparent'
          placeholder='Deck Name'
        />       

        <Button 
          backgroundColor='orange'
          buttonStyle={{ marginTop: 20 }}
          title='Save Deck Name'
          onPress={() => saveNewDeck()}
        />
        
        
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddEntry);