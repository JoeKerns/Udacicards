import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { logQuestion, resetQuiz } from '../actions/actions';

import { AppLoading} from 'expo';

import { orange } from '../utils/colors';

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation;
    return {
      title: navigation.state.params.title ? `${navigation.state.params.title} Quiz` : 'Quiz'
    }
  }

  state = {
    showAnswer: false,
  }

  render() {
    const { decks, quizzes, navigation, dispatch } = this.props;
    const deck = decks[navigation.state.params.title];
    const { questions } = deck;
    //const { width, height } = this.state;
    //console.log('this.props',this.props);
   
    if (decks === null) {
      return <AppLoading />
    }

    const flipCard = () => {
      this.setState({
        showAnswer: !this.state.showAnswer
      })
    }

    const logCorrect = () => {
      dispatch(logQuestion('correct'));
      if (this.state.showAnswer === true) {
        flipCard();
      }
    }

    const logIncorrect = () => {
      dispatch(logQuestion('incorrect'));
      if (this.state.showAnswer === true) {
        flipCard();
      }
    }

    const quizReset = () => {
      dispatch(resetQuiz());
      navigation.navigate('Quiz', { title: navigation.state.params.title });
    };

    const resetThenHome = () => {
      dispatch(resetQuiz());
      navigation.navigate('DeckDetails', { title: navigation.state.params.title, questions: questions });
    }

    if (quizzes.qIndex && quizzes.qIndex === questions.length) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Card
            title='Flashcards complete!'
          >

            <Text>{ (quizzes.correct / questions.length * 100) }% Correct</Text>
            <Button 
              icon={{name: 'redo', type: 'MaterialIcons'}}
              buttonStyle={styles.btn}
              title='Reset Quiz'
              onPress={() => quizReset()}
            />

            <Button  
              icon={{name: 'text-document', type: 'entypo'}}
              buttonStyle={styles.btn}
              buttonStyle={{ margin: 12, backgroundColor: 'orange' }}
              title='Back To Deck Details'
              onPress={() => resetThenHome()}
            />
          
          </Card>

          
        </View>
        
      )
    }

    const thisCard = quizzes.qIndex + 1;

    return (
      <View>
        <Card
          title='Quiz'
        >
          <Text>{ thisCard } of { questions.length } </Text>
          {
            this.state.showAnswer === true ? <Text>{deck.questions[quizzes.qIndex].answer}</Text> : <Text>{deck.questions[quizzes.qIndex].question}</Text>
          } 

          <Button  
            buttonStyle={styles.btn}
            title='Show Answer'
            onPress={() => flipCard()}
          />

          <Button  
            buttonStyle={styles.btn}
            title='Correct'
            onPress={() => logCorrect()}
          />

          <Button  
            buttonStyle={styles.btn}
            title='Incorrect'
            onPress={() => logIncorrect()}
          />
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%'
  },
  btn: {
    backgroundColor: 'orange', 
    margin: 12, 
    width: 120
    
  }
})

function mapStateToProps ({ decks, quizzes }) {
  return {
    decks,
    quizzes
  }
}

export default connect(mapStateToProps)(Quiz);