import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { decksGet } from '../actions/actions';

import { getDecks } from '../utils/api';
import { orange } from '../utils/colors';

import { AppLoading} from 'expo';

class Decks extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    getDecks().then((decks) => {
      dispatch(decksGet(decks))
    });
  }
  render() {
    const { decks, navigation } = this.props;

    if (decks === null) {
      return <AppLoading />
    }

    return (
      <ScrollView>
        {
          decks && Object.keys(decks).map(deck => {
            return <Card key={decks[deck].title} title={decks[deck].title}>
              <Text>Cards: {decks[deck].questions.length}</Text>
              <Button
                icon={{name: 'text-document', type: 'entypo'}}
                backgroundColor='orange'
                buttonStyle={{borderRadius: 3, marginTop: 12, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='View Deck'
                onPress={() => navigation.navigate('DeckDetails', { title: decks[deck].title, questions: decks[deck].questions })} />
            </Card>
          })
        }
      </ScrollView>
    )
  }
}

function mapStateToProps ({ decks }) {
  return { decks }
}

export default connect(mapStateToProps)(Decks);