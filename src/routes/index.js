
import {
  Platform,

} from '@components';
import { createStackNavigator } from 'react-navigation'
import { color } from '@common/style'

import RouterConfig from './pages'
console.log(RouterConfig)

//debugger
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

export default createStackNavigator(RouterConfig, {
  // 默认显示界面
  initialRouteName: 'BottomTab',

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
})

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
