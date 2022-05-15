import AppRoutes from '@navigation/routes';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StoriesStackParamListExtended } from '../StoriesStack';
import Story from './components/Story';
import { IStory } from './components/Story/Story';

const stories: IStory[] = [
  {
    id: '1',
    user: 'Maria',
    avatar: { uri: 'https://i.pinimg.com/564x/16/d5/fb/16d5fb7f9596ea39c41d6a21bc0c3f36.jpg' },
    source: { uri: 'https://i.pinimg.com/564x/f5/90/07/f590072e0a8057bd239dfdcd84b6be8e.jpg' },
  },
  {
    id: '2',
    user: 'Vlad',
    avatar: { uri: 'https://i.pinimg.com/564x/ae/ae/f0/aeaef0e935efcb8414bc830ee9452285.jpg' },
    source: { uri: 'https://i.pinimg.com/564x/6a/1c/ad/6a1cad2cb2b5b2ca3a47b824621f2073.jpg' },
  },
];

const StoriesViewScreen: FC<StoriesViewScreenProps> = ({
  route: {
    params: { storyId },
  },
}) => {
  return (
    <View style={styles.root}>
      <Text>Stories</Text>
      {stories.map((story) => {
        return <Story key={story.id} story={story} />;
      })}
    </View>
  );
};
export interface StoriesViewScreenProps {
  navigation: NativeStackNavigationProp<StoriesStackParamListExtended, AppRoutes.StoriesViewScreen>;
  route: RouteProp<StoriesStackParamListExtended, AppRoutes.StoriesViewScreen>;
}

const styles = StyleSheet.create({ root: { flex: 1, justifyContent: 'center', alignItems: 'center' } });

export default StoriesViewScreen;
