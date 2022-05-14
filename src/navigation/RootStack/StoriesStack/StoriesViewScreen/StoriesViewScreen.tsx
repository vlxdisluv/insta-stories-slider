import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppRoutes from '../../../routes';
import { StoriesStackParamListExtended } from '../StoriesStack';

const StoriesViewScreen: FC<StoriesViewScreenProps> = ({
  route: {
    params: { storyId },
  },
}) => {
  return (
    <View style={styles.root}>
      <Text>Stories</Text>
    </View>
  );
};
export interface StoriesViewScreenProps {
  navigation: NativeStackNavigationProp<StoriesStackParamListExtended, AppRoutes.StoriesViewScreen>;
  route: RouteProp<StoriesStackParamListExtended, AppRoutes.StoriesViewScreen>;
}

const styles = StyleSheet.create({ root: { flex: 1, justifyContent: 'center', alignItems: 'center' } });

export default StoriesViewScreen;
