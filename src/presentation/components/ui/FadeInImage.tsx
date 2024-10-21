import {useAnimation} from '@presentation/hooks/use-animation';
import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageStyle,
  StyleProp,
  View,
} from 'react-native';

interface FadeInImageProps {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, style}: FadeInImageProps) => {
  const {animatedOpacity, fade} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const isDestroyed = useRef(false);

  useEffect(() => {
    return () => {
      isDestroyed.current = true;
    };
  }, []);

  const onLoadEnd = () => {
    if (isDestroyed.current) {
      return;
    }
    fade({});
    setIsLoading(false);
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        source={{uri}}
        onLoadEnd={onLoadEnd}
        style={[style, {opacity: animatedOpacity, resizeMode: 'contain'}]}
      />
    </View>
  );
};
