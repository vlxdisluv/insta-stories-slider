import React, { FC, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  cancelAnimation,
  interpolate,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { IStory } from '../../types';
import Story from './Story';
import StoryAnimatedView from './StoryAnimatedView';

const { width } = Dimensions.get('window');

interface StoriesProps {
  storyId: string;
  stories: IStory[];
}

type ContextType = {
  x: number;
};

enum DirectionType {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

// 0 is meaning that to make the swipe to another slide need take offsetX more than half width of slide or equal
const ratioToOffset = 0.3;
// duration is the speed of animation
const duration = 500;

const Stories: FC<StoriesProps> = ({ storyId, stories }) => {
  const x = useSharedValue(0);

  const maxTranslateX = useMemo(() => -(width * (stories.length - 1)), [stories.length]);

  const eachStoryPosition = useMemo(
    () => Array.from({ length: stories.length }, (_, i) => i * width),
    [stories.length],
  );

  const clampTranslateX = useDerivedValue(() => {
    if (x.value > 0) {
      // simulate first element left swipe animation
      return interpolate(-x.value, [0, -400], [0, -80], Extrapolate.CLAMP);
    }

    if (x.value < maxTranslateX) {
      // simulate last element right swipe animation
      return Math.abs(
        interpolate(
          x.value,
          [maxTranslateX, maxTranslateX - 400],
          [maxTranslateX, maxTranslateX - 80],
          Extrapolate.CLAMP,
        ),
      );
    }

    // set boundary of max min value and return only positive number
    return Math.abs(Math.max(Math.min(x.value, 0), maxTranslateX));
  }, [maxTranslateX]);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      cancelAnimation(x);
    },
    onActive: (event, ctx) => {
      // ctx.x contain the prev value
      x.value = event.translationX + ctx.x;
    },
    onEnd: (_, ctx) => {
      const direction: DirectionType = ctx.x > x.value ? DirectionType.RIGHT : DirectionType.LEFT;

      if (direction === DirectionType.LEFT && x.value > 0) {
        // prevent swipe to next slide while user try to left swipe on the first slide
        return (x.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }));
      }

      // find nearest screen position to snap
      const closestSnapPosition = eachStoryPosition.reduce(function (actualScreenPositionX, potentialScreenPositionX) {
        const swipeOffset = width * ratioToOffset;

        const computedPositionOfAutomaticSwipeAnimation =
          direction === DirectionType.LEFT ? Math.abs(x.value) - swipeOffset : Math.abs(x.value) + swipeOffset;

        return Math.abs(potentialScreenPositionX - computedPositionOfAutomaticSwipeAnimation) <
          Math.abs(actualScreenPositionX - computedPositionOfAutomaticSwipeAnimation)
          ? potentialScreenPositionX
          : actualScreenPositionX;
      });

      // start animation
      x.value = withTiming(-closestSnapPosition, {
        duration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onHandlerStateChange={gestureHandler}>
        <Animated.View style={styles.container}>
          {stories.map((story, i) => (
            <StoryAnimatedView key={story.id} x={clampTranslateX} index={i}>
              <Story {...{ story }} />
            </StoryAnimatedView>
          ))}
        </Animated.View>
      </PanGestureHandler>
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
