import React, {
  PureComponent
} from 'react';

import {
  Platform,
  BackHandler,
  ToastAndroid
} from '@components';
import {
  createAppContainer
} from 'react-navigation';

import RootStack from '../../src/routes'

const AppContainer = createAppContainer(RootStack);


export default class App extends PureComponent {

  // *** 监听页面切换
  onNavigationStateChange = (prevState, currentState) => {
    const currentScreen = getActiveRouteName(currentState);
    const prevScreen = getActiveRouteName(prevState);
    if (prevScreen !== currentScreen && Platform.OS === 'android') {
      // 首页时监听 hardwareBackPress
      if (currentScreen === 'HomeTab') {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);

        // 非首页时取消监听 hardwareBackPress
      } else {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
      }

    }

  }

  // *** android 退出应用前的提示
  onBackAndroid = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //BackHandler.exitApp();
      return false
    } else {
      this.lastBackPressed = Date.now();
      ToastAndroid && ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
      // 返回 true 时不关闭
      return true
    }
  }

  render() {
    return <AppContainer onNavigationStateChange={
      this.onNavigationStateChange
    }
    />;
  }
}

/**
 * 
 * 获取当前路由的名称
 * 
 */
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];

  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}