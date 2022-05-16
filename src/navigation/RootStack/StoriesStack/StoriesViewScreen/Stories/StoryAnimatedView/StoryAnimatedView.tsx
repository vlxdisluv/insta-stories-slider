import React, { FC } from 'react';
import {
  Dimensions,
  PerpectiveTransform,
  Platform,
  RotateYTransform,
  TranslateXTransform,
  ViewStyle,
} from 'react-native';
import Animated, { Extrapolate, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const ratio = Platform.OS === 'ios' ? 2 : 1.2;
const extrapolate = Extrapolate.CLAMP;

interface StoryAnimatedViewProps {
  x: SharedValue<number>;
  index: number;
  children: React.ReactNode;
}

const absoluteFillObject = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 };

const StoryAnimatedView: FC<StoryAnimatedViewProps> = ({ x, index, children }) => {
  const rootStylez = useAnimatedStyle(() => {
    const offset = index * width;

    const inputRange = [offset - width, offset + width];
    const translateX = interpolate(x.value, inputRange, [width / ratio, -width / ratio], extrapolate);
    const rotateY = interpolate(x.value, inputRange, [angle, -angle], extrapolate);

    const alpha = Math.abs(rotateY);
    const gamma = angle - alpha;
    const beta = Math.PI - alpha - gamma;
    const w = width / 2 - ((width / 2) * Math.sin(gamma)) / Math.sin(beta);
    const translateX1 = rotateY > 0 ? w : -w;

    let transform: (PerpectiveTransform | RotateYTransform | TranslateXTransform)[] = [
      { perspective },
      { translateX },
      { rotateY: rotateY + 'rad' },
      { translateX: translateX1 },
    ];

    if (Platform.OS === 'android') {
      const extra = width / 2 / Math.cos(angle / 2) - width / 2;
      const translateX2 = interpolate(x.value, inputRange, [-extra, extra], Extrapolate.CLAMP);

      transform = [...transform, { translateX: translateX2 }];
    }

    return {
      ...(absoluteFillObject as ViewStyle),
      transform,
    };
  });

  const maskStylez = useAnimatedStyle(() => {
    const offset = index * width;
    const inputRange = [offset - width, offset, offset + width];
    const opacity = interpolate(x.value, inputRange, [0.75, 0, 0.75], extrapolate);

    return {
      ...(absoluteFillObject as ViewStyle),
      zIndex: opacity === 0 ? 0 : 1,
      backgroundColor: 'black',
      opacity,
    };
  });

  return (
    <Animated.View style={rootStylez}>
      <Animated.View style={maskStylez} />
      {children}
    </Animated.View>
  );
};

export default StoryAnimatedView;
