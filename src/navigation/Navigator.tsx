import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import RootStack from './RootStack';

const Navigator = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default gestureHandlerRootHOC(Navigator);
