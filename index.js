/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BeginNavigation from './Navigation/beginToLogin';

AppRegistry.registerComponent(appName, () => BeginNavigation);
