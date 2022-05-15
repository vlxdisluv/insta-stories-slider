import React, { FC } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import { IStory } from '../../types';
import Story from './Story';
import StoryAnimatedView from './StoryAnimatedView';

const { width } = Dimensions.get('window');

interface StoriesProps {
  storyId: string;
  stories: IStory[];
}

const Stories: FC<StoriesProps> = ({ storyId, stories }) => {
  const x = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    x.value = e.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      {stories.map((story, i) => (
        <StoryAnimatedView key={story.id} x={x} index={i}>
          <Story {...{ story }} />
        </StoryAnimatedView>
      ))}

      <Animated.ScrollView
        style={{ ...StyleSheet.absoluteFillObject }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={width}
        contentContainerStyle={{ width: width * stories.length }}
        onScroll={scrollHandler}
        decelerationRate={0.89}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Stories;
