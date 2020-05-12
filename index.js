/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './js/index';
import {name as appName} from './app.json';

console.disableYellowBox = true 
AppRegistry.registerComponent(appName, () => App);
