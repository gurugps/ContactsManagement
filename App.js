/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  PermissionsAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Contacts from 'react-native-contacts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }
  componentDidMount(){
    setTimeout(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      'title': 'Contacts',
      'message': 'This app would like to view your contacts.',
      'buttonPositive': 'Please accept'
    }).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied'){
          // error
          console.log("Contacts:ERROR",err);
        } else {
          // contacts returned in Array
          this.setState({ contacts: contacts});
          console.log("Contacts: ",contacts);
        }
      })
    })}, 1000);
  }

  renderSeparator() {
    return (<View style = {{height:6,backgroundColor:'#eeeeee'}}/>);
  }
  renderItem = ({item}) => (
        <View style={styles.itemContainer}>
            <Text style={styles.contactName}>
                Name: {`${item.givenName} `} {item.familyName}
            </Text>
            {item.phoneNumbers.map(phone => (
                <Text style={styles.phones}>{phone.label} : {phone.number}</Text>
            ))}
        </View>
    )
    render() {
        return (
            <View style={styles.sectionContainer}>
                <FlatList
                    data={this.state.contacts}
                    renderItem={this.renderItem}
                    //Setting the number of column
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  itemContainer: {
        margin: 10
  },
  contactName: {
      fontSize:16,
      color: 'blue'
  },
});

export default App;
