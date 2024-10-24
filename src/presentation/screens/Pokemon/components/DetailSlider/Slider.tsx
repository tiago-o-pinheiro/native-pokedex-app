import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import {FlatList, Pressable} from 'react-native-gesture-handler';
import {PokemonAboutScreen} from './About.tsx';
import {PokemonStatsScreen} from './Stats';
import {PokemonEvolutionScreen} from './Evolution';
import {PokemonMovesScreen} from './Moves';
import {useRef, useState} from 'react';
import {gaps} from '@theme/gaps.ts';
import {Pokemon} from '@domain/entities/pokemons.ts';
import {ActivityIndicator, useTheme} from 'react-native-paper';

interface SliderProps {
  title: string;
  component: React.ElementType;
}

const SliderOptions: SliderProps[] = [
  {
    title: 'About',
    component: PokemonAboutScreen,
  },
  {
    title: 'Base Stats',
    component: PokemonStatsScreen,
  },
  {
    title: 'Evolution',
    component: PokemonEvolutionScreen,
  },
  {
    title: 'Moves',
    component: PokemonMovesScreen,
  },
];

const isActive = (index: number, currentIndex: number) => {
  return index === currentIndex;
};

export const DetailSlider = ({pokemon}: {pokemon?: Pokemon}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const {height, width} = useWindowDimensions();
  const sliderRef = useRef<FlatList>(null);
  const {colors} = useTheme();

  const onScroll = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset} = ev.nativeEvent;
    const currentIndex = Math.ceil(contentOffset.x / width);
    const comparedIndex =
      currentIndex > SliderOptions.length - 1
        ? SliderOptions.length - 1
        : currentIndex;
    setCurrentIndex(comparedIndex > 0 ? comparedIndex : 0);
  };

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollToIndex({index: index, animated: true});
    }
  };

  if (!pokemon) {
    return <ActivityIndicator size={50} />;
  }

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.containerButtons,
          {backgroundColor: colors.background ?? 'white'},
        ]}>
        {SliderOptions.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              scrollToSlide(index);
            }}>
            <Text
              style={[
                styles.pressableTabText,
                {
                  color: isActive(index, currentIndex)
                    ? 'grey'
                    : 'rgba(125, 123, 123, 0.33)',
                },
              ]}>
              {item.title}
            </Text>
            {isActive(index, currentIndex) && (
              <View
                style={[
                  styles.pressableTab,
                  {
                    borderBottomColor: colors.outline,
                  },
                ]}
              />
            )}
          </Pressable>
        ))}
      </View>
      <FlatList
        ref={sliderRef}
        horizontal
        pagingEnabled
        decelerationRate={'fast'}
        data={SliderOptions}
        keyExtractor={item => item.title}
        renderItem={({item}) => <item.component {...{...pokemon}} />}
        style={[styles.container, {height: height * 0.6}]}
        onScroll={ev => {
          onScroll(ev);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: gaps.xl,
    paddingBottom: gaps.s,
  },
  pressableTab: {
    paddingTop: gaps.xs,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(33, 65, 173, 0.41)',
  },
  pressableTabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
