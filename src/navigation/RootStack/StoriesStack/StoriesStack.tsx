import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC } from 'react';
import AppRoutes from '../../routes';
import { RootStackParamList } from '../RootStack';
import StoriesViewScreen from './StoriesViewScreen';
import { StoryType } from './tyoe';
import { TransitionPresets } from '@react-navigation/stack';

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
