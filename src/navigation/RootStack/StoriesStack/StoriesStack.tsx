import AppRoutes from '@navigation/routes';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import React, { FC } from 'react';

import { RootStackParamList } from '../RootStack';
import StoriesViewScreen from './StoriesViewScreen';
import { StoryType } from './types';

const Stack = createNativeStackNavigator<StoriesStackParamListExtended>();

const StoriesStack: FC<StoriesStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRoutes.StoriesViewScreen}
        component={StoriesViewScreen}
        options={{ headerShown: false, gestureEnabled: true, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen name={AppRoutes.StoriesMyScreen} component={StoriesViewScreen} />
      <Stack.Screen name={AppRoutes.StoriesCreateScreen} component={StoriesViewScreen} />
      <Stack.Screen name={AppRoutes.StoriesPrePublishScreen} component={StoriesViewScreen} />
    </Stack.Navigator>
  );
};

export type StoriesStackParamListExtended = RootStackParamList & StoriesStackParamList;

export type StoriesStackParamList = {
  [AppRoutes.StoriesMyScreen]: undefined;
  [AppRoutes.StoriesViewScreen]: { storyId: string };
  [AppRoutes.StoriesCreateScreen]: undefined;
  [AppRoutes.StoriesPrePublishScreen]: { type: StoryType; source: string };
};

export interface StoriesStackProps {
  navigation: NativeStackNavigationProp<RootStackParamList, AppRoutes.StoriesStack>;
  route: RouteProp<RootStackParamList, AppRoutes.StoriesStack>;
}

export default StoriesStack;
