import {useRef} from 'react';
import {Animated, Easing, EasingFunction, PanResponder} from 'react-native';

type MOVE_FROM_TOP = {
  duration?: number;
  toValue?: number;
  callback?: () => void;
  startPostion?: number;
  easing?: EasingFunction;
};

type FADE_PROPS = {
  duration?: number;
  toValue?: number;
  callback?: () => void;
};

export const useAnimation = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedMove = useRef(new Animated.Value(0)).current;

  const fade = ({
    duration = 300,
    toValue = 1,
    callback = () => {},
  }: FADE_PROPS) => {
    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }).start(callback);
  };

  const move = ({
    duration = 300,
    toValue = 100,
    callback = () => {},
    startPostion = 0,
    easing = Easing.bounce,
  }: MOVE_FROM_TOP) => {
    animatedMove.setValue(startPostion);
    Animated.timing(animatedMove, {
      toValue: toValue,
      duration: duration,
      easing: easing,
      useNativeDriver: true,
    }).start(callback);
  };

  return {
    fade,
    move,
    animatedOpacity,
    animatedMove,
  };
};
