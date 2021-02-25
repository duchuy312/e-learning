/**
 * @format
 */

import {AppRegistry} from 'react-native';
import MainCourse from './src/course/Main';
import {name as appName} from './app.json';
import Navigation from './Navigation/navigations';

AppRegistry.registerComponent(appName, () => MainCourse);
