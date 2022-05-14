import AppRoutes from '@navigation/routes';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../RootStack';

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <Button
        title="Open Stories"
        onPress={() =>
          navigation.navigate(AppRoutes.StoriesStack, { screen: AppRoutes.StoriesViewScreen, params: { storyId: '1' } })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, AppRoutes.HomeScreen>;
  route: RouteProp<RootStackParamList, AppRoutes.HomeScreen>;
}

export default HomeScreen;
