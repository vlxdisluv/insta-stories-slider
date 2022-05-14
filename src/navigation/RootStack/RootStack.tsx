import AppRoutes from '@navigation/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';

import HomeScreen from './HomeScreen';
import StoriesStack, { StoriesStackParamList } from './StoriesStack/StoriesStack';
import { SubNavigator } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRoutes.HomeScreen}
        component={HomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={AppRoutes.StoriesStack}
        component={StoriesStack}
        options={{
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export type RootStackParamList = {
  [AppRoutes.HomeScreen]: undefined;
  [AppRoutes.StoriesStack]: SubNavigator<StoriesStackParamList>;
};

export default RootStack;
