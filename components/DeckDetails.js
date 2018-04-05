import React from 'react';
import { Text, View, AsyncStorage, Animated } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { resetQuiz } from '../actions/actions';
import { orange } from '../utils/colors';

class DeckDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation;
    return {
      title: navigation.state.params.title ? navigation.state.params.title : 'Deck Details'
    }
  }

  state = {
    height: new Animated.Value(0),
    width: new Animated.Value(0),
  }

  componentDidMount() {
    const { width, height } = this.state;
    Animated.timing(width, { toValue: 360, speed: 5 }).start();
    Animated.timing(height, { toValue: 240, speed: 5 }).start();
  }

  render() {
    const { navigation } = this.props;
    const { title } = this.props.navigation.state.params;
    const questions = this.props.decks[title].questions;
    const { width, height } = this.state;

    return(
      <Animated.View style={{ width: width, height: height, flex: 1 }}>
        <Card key={title} title={title}>
          <Text>Cards: { questions.length }</Text>

          <Button
              icon={{name: 'arrow-with-circle-right', type: 'entypo'}}
              backgroundColor='orange'
              buttonStyle={{borderRadius: 3, marginTop: 12, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Start Quiz'
              onPress={() => navigation.navigate('Quiz', { title: title })} />

          <Button
            icon={{name: 'add-to-list', type: 'entypo'}}
            backgroundColor='orange'
            buttonStyle={{borderRadius: 3, marginTop: 12, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Add Card'
            onPress={() => navigation.navigate('AddCard', { title: title })} />
            
        </Card>
      </Animated.View>
    )
  }
}

function mapStateToProps ({ decks }) {
  return { decks }
}

export default connect(mapStateToProps)(DeckDetails);