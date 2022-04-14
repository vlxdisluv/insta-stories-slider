import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC } from 'react';
import { Button, Text, View } from 'react-native';
import AppRoutes from '../../routes';
import { RootStackParamList } from '../RootStack';

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate(AppRoutes.DetailsScreen, { userId: '123' })} />
    </View>
  );
};

export interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, AppRoutes.HomeScreen>;
  route: RouteProp<RootStackParamList, AppRoutes.HomeScreen>;
}

export default HomeScreen;
