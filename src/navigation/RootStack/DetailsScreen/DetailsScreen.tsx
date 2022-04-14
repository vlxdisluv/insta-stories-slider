import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC } from 'react';
import { Text, View } from 'react-native';
import AppRoutes from '../../routes';
import { RootStackParamList } from '../RootStack';

const DetailsScreen: FC<DetailsScreenProps> = ({
  route: {
    params: { userId },
  },
}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>User Id: {userId}</Text>
    </View>
  );
};

export interface DetailsScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, AppRoutes.DetailsScreen>;
  route: RouteProp<RootStackParamList, AppRoutes.DetailsScreen>;
}

export default DetailsScreen;
