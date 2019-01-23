import React, {
  PureComponent
} from 'react';

import {
  Icon,
  Platform,
  Alert,
  BackHandler,
  ToastAndroid
} from '@components';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer, getActiveChildNavigationOptions
} from 'react-navigation';

import {
  size,
  color,
  layout
} from '@common/style'

import Home from '@pages/Home/Home'
import Demo from '@pages/Demo/Index'
import Photo from '@pages/Demo/Photo'
import Detail from '@pages/Home/Detail'
import BottomNav from '@pages/Demo/BottomNav'

/*** 底部导航栏 */
const TabBar = createBottomTabNavigator({
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
      }) => (getIcon('shopping-cart', focused)),
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
      }) => (getIcon('user', focused)),
    },
  },
}, {
    tabBarOptions: {
      activeTintColor: color.baseColor,
      inactiveTintColor: '#000',
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

const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;
const RootStack = createStackNavigator({
  TabBar,
  BottomNav,
  Detail,
  Photo
}, {
    // 默认显示界面
    initialRouteName: 'TabBar',

    transitionConfig,

    //*** 公共 navigation 样式 
    defaultNavigationOptions: {

      // 【IOS】去掉返回按钮旁文本
      headerBackTitle: null,

      headerStyle: {
        backgroundColor: color.baseColor,
      },

      headerTintColor: '#fff',

      // 处理 android tititle 不居中
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center', fontSize: 18,
        flex: 1,
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      }

    },
  });





const AppContainer = createAppContainer(RootStack);


export default class App extends React.Component {

  // *** 监听页面切换
  onNavigationStateChange = (prevState, currentState) => {
    const currentScreen = getActiveRouteName(currentState);
    const prevScreen = getActiveRouteName(prevState);
    if (prevScreen !== currentScreen && Platform.OS === 'android') {
      // 首页时监听 hardwareBackPress
      if (currentScreen === 'Home') {
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

const getIcon = (iconName, focused) => (<
  Icon name={
    iconName
  }
  size={
    24
  }
  color={
    focused ? color.baseColor : '#000'
  }
/>)

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


/**
 * 
 * 将 android 的从下到上的动画 改为从右到左
 *
 * */

function transitionConfig() {
  if (Platform.OS === "ios") {
    return false
  }

  return {

    screenInterpolator: sceneProps => {
      const {
        position,
        layout,
        scene
      } = sceneProps;
      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, -width],
      });

      const pushFromRight = {
        transform: [{
          translateX
        }]
      };
      return pushFromRight;
    },
  };
};