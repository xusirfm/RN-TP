import {
    AppRegistry
} from 'react-native';
import App from '@pages/App';
import {
    APP_NAME
} from '@common/config.js';

AppRegistry.registerComponent(APP_NAME, () => App);