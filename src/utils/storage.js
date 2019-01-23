import React, {
  AsyncStorage
} from 'react-native';


/***
  Storage.set('name', 'xusir')

  Storage.get('name').then(rs => {
    console.log(rs)
  })

 */
export default class Storage {
  /**
   * 获取
   */

  static get = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return JSON.parse(value)
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }


  /**
   * 保存
   */
  static set = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true
    } catch (error) {
      return false
    }
  }


  /**
   * 更新
   */
  static update = async (key, value) => {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value));
      return true
    } catch (error) {
      return false
    }
  }


  /**
   * 移除
   */
  static remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true
    } catch (error) {
      return false
    }
  }
}
