import React, { PureComponent } from 'react';
import { Icon, ScrollView, Text } from '@components';

import { size, color, layout } from '@common/style'
import { Storage } from '@utils'

export default class Index extends PureComponent {
  static navigationOptions = {
    title: '所有示例',
  };

  render() {
    Storage.set('name', 'xusir')

    Storage.get('name').then(rs => {
      console.log(rs)
    })
    //console.log(name)
    return (
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >

        <Text
          onPress={() => {
            this.props.navigation.navigate('Photo');
          }}
        >
          拍摄照片、从相册选择<Icon name={'xiangyou1'} size={24} color={color.baseColor} />
        </Text>

      </ScrollView>

    );
  }

}


