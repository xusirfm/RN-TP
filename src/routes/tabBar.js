import React, {
  PureComponent
} from 'react';
import {
  createBottomTabNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation';
import {
  Icon,
} from '@components';
import { color } from '@common/style'

import Home from '@pages/Home/Home'
import Demo from '@pages/Demo/Index'
import Detail from '@pages/Home/Detail'

/*** 底部导航栏 */
export default createBottomTabNavigator({
  HomeTab: {
    screen: Home,
    path: '/',
    navigationOptions: {
      title: '首页',
      tabBarLabel: '首页',
      tabBarIcon: ({
        focused
      }) => (getIcon('home', focused)),
    },
  },
  CartTab: {
    screen: Demo,
    path: '/',
    navigationOptions: {
      title: '购物车',
      tabBarLabel: '购物车',
      tabBarIcon: ({
        focused
      }) => (getIcon('cart', focused)),
    },
  },
  UcenterTab: {
    screen: Detail,
    path: '/',
    navigationOptions: {
      title: '我的',
      tabBarLabel: '我的',
      tabBarIcon: ({
        focused
      }) => (getIcon('my', focused)),
    },
  },
}, {
    tabBarOptions: {
      inactiveTintColor: '#000',
      activeTintColor: color.baseColor,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        borderTopColor: '#f6f6f6', elevation: 4,
        shadowColor: '#eee', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 1, shadowRadius: 10,
      }
    },
    navigationOptions: ({ navigation, screenProps }) => {
      const childOptions = getActiveChildNavigationOptions(navigation, screenProps);
      return {
        title: childOptions.title,
      };
    }
  })

/**
 * 
 * 获取 Icon
 */
function getIcon(iconName, focused) {
  focused && (iconName = `${iconName}_fill`)
  return <Icon
    name={
      iconName
    }
    size={
      24
    }
    color={
      focused ? color.baseColor : '#000'
    }
  />
}