import {
    Platform,
    StyleSheet,
} from 'react-native';

module.exports = {

    // 大小相关
    size: {
        fontBase: 36,
    },
    // 色调相关
    color: {
        baseColor: '#6b52ae'
    },
    // 布局相关
    layout: {
        flexRow: {
            display: 'flex',
        },
        flexCol: {
            display: 'flex',
            flexDirection: 'column'
        },
        flex1: {
            flex: 1
        },
        // 水平升起 & 垂直居中
        center: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        // 水平居中
        centerL: {
            alignItems: 'center'
        },
        // 垂直居中
        centerV: {
            justifyContent: 'center'
        }
    }
}


