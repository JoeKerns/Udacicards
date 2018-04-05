import React from 'react';
import { KeyboardAvoidingView, Text, View, AsyncStorage, TextInput, BackHandler } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { saveQuestion } from '../actions/actions';
import { deckAddCardToAsync } from '../utils/api';
import { orange } from '../utils/colors';

class AddCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation;
    return {
      title: navigation.state.params.title ? `${navigation.state.params.title} - Add Card` : 'Add Card'
    }
  }

  state = {
    question: null,
    answer: null
  }

  render() {
    const { dispatch, navigation } = this.props;
    const { title } = this.props.navigation.state.params;

    const updateQuestion = (question) => {
      this.setState({
        question
      });
    }

    const updateAnswer = (answer) => {
      this.setState({
        answer
      })
    }

    const saveQA = () => {
      // question: "What is React?", answer: "A library for managing user interfaces"
      const qanda = {
        question: this.state.question,
        answer: this.state.answer
      }
      console.log('Q/A',qanda);
      dispatch(saveQuestion(title,qanda));
      deckAddCardToAsync(title,qanda);
      alert('Card Added!');
      navigation.goBack();
    }

    return(
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} behavior="padding">
        <Text style={{ fontSize: 24, marginBottom: 12 }}>Deck { title }</Text>
        <Text style={{ fontSize: 18, marginBottom: 12 }}>Question</Text>
          
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 2, width: '60%', padding: 12 }}
          onChangeText={question => updateQuestion(question)}
          value={this.state.question}
          placeholder='Question'
        />

        <Text style={{ fontSize: 18, margin: 20 }}>Answer</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 2, width: '60%', padding: 12 }}
          onChangeText={answer => updateAnswer(answer)}
          value={this.state.answer}
          placeholder='Answer'
        />

        <Button 
          buttonStyle={{ marginTop: 12 }}
          backgroundColor='orange'
          title='Save Question/Answer'
          onPress={(name) => saveQA()}
        />        
      </KeyboardAvoidingView>
    )
  }
}

  export default connect()(AddCard);