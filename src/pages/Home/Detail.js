import React, { PureComponent } from 'react';
import { View, Button, Text, StyleSheet, Image, Platform, Alert, BackHandler, StatusBar, ScrollView } from 'react-native';
import { size, color, layout } from '@common/style'


export default class Detail extends PureComponent {
  static navigationOptions = {
    title: 'Details',
    backgroundColor: color.baseColor
  };

  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');
    return (
      <View style={{ fontSize: size.fontBase, }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to BottomNav"
          onPress={() =>
            this.props.navigation.push('BottomNav', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('HomeTab')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button title="alert" onPress={() => {

          Alert.alert(
            '',
            '确定要退出？',
            [
              { text: '取消', onPress: () => console.log('Cancel Pressed!') },
              { text: '确定', onPress: () => console.log('yes'), style: "destructive" },
            ]
          )
        }} />
      </View>
    );
  }

  componentWillUnmount() {
    //Alert.alert('willun')
  }
}


