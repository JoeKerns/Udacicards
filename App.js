import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers';

import { TabNavigator, StackNavigator } from 'react-navigation';

import Decks from './components/Decks';
import AddDeck from './components/AddDeck';
import DeckDetails from './components/DeckDetails';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

import { Constants } from 'expo';
import { brown, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { setLocalNotification } from './utils/api';

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props } />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Create Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? brown : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : brown,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})


const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: brown,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: brown,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: brown,
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MyStatusBar background={brown} barStyle='light-content' />
          <MainNavigator onNavigationStateChange={null} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
