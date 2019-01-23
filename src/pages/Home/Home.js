import React, { PureComponent } from 'react';
import { View, Button, Text, StyleSheet, Image, Platform, Alert, BackHandler, StatusBar, ScrollView, DeviceEventEmitter } from 'react-native';
import { size, color, layout } from '@common/style'

export default class Home extends PureComponent {
  static navigationOptions = {
    title: '首页',
  };

  constructor(props) {
    super(props)
    this.state = {
      name: 'xusir'
    }
  }

  render() {

    const styles = StyleSheet.create({
      contentContainer: {
        paddingVertical: 20
      }
    });
    return (
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
        <StatusBar
          backgroundColor="#6b52ae"
          barStyle="light-content"
        />

        <Text
          onPress={() => {

            this.props.navigation.navigate('Photo');
          }}
        >go detail a</Text>

        <Text style={{ fontSize: size.fontBase, color: color.baseColor }}>Home Screen</Text>




      </ScrollView>

    );
  }

  componentDidMount() {
    this.setState({ 'name': '...' })
    //SplashScreen.hide()
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      //BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {


    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);

    }
  }



}


