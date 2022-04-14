import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppRoutes from '../routes';
import DetailsScreen from './DetailsScreen';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AppRoutes.HomeScreen} component={HomeScreen} options={{ title: 'Home Screen' }} />
      <Stack.Screen name={AppRoutes.DetailsScreen} component={DetailsScreen} options={{ title: 'Details Screen' }} />
    </Stack.Navigator>
  );
};

export type RootStackParamList = {
  [AppRoutes.HomeScreen]: undefined;
  [AppRoutes.DetailsScreen]: { userId: string };
};

export default RootStack;
