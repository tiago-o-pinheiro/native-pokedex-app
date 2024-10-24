import {Formatter} from '@config/helpers/formatter';
import {PokemonEvolution} from '@domain/entities/pokemon-evolution';
import {FadeInImage} from '@presentation/components';
import {gaps} from '@theme/gaps';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface PokemonEvolutionProps {
  evolution: PokemonEvolution[];
}

const getIdFromUrl = (url: string): number => {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2], 10);
};

const getImageLink = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

// const SPECIAL_POKEMON_EVOLUTIONS = ['eevee'];

// const Evolutions = (evolution: PokemonEvolution[]) => {
//   //Fix this for special pokemons evolutions
//   return (
//     <View>
//       {evolution.map((item, index) => {
//         if (SPECIAL_POKEMON_EVOLUTIONS.includes(item.name)) {
//           return (
//             <View>
//               <View style={styles.evolutionItem}>
//                 <FadeInImage
//                   uri={getImageLink(getIdFromUrl(item.url))}
//                   style={{width: 80, height: 80}}
//                 />
//                 <Text>{Formatter.capitalize(item.name)}</Text>
//               </View>
//             </View>
//           );
//         }
//       })}
//       <FlatList
//         data={evolution}
//         keyExtractor={item => item.name}
//         horizontal
//         renderItem={({item, index}) => (
//           <View style={styles.evolutionContainer}>
//             <View style={styles.evolutionItem}>
//               <FadeInImage
//                 uri={getImageLink(getIdFromUrl(item.url))}
//                 style={{width: 80, height: 80}}
//               />
//               <Text>{Formatter.capitalize(item.name)}</Text>
//             </View>
//             {index !== evolution.length - 1 && (
//               <View style={styles.evolutionArrow}>
//                 <Icon name="arrow-right" size={20} />
//               </View>
//             )}
//           </View>
//         )}
//       />
//     </View>
//   );
// };

export const PokemonEvolutionScreen = ({evolution}: PokemonEvolutionProps) => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <View
      style={[styles.container, {width, backgroundColor: colors.background}]}>
      <Text
        variant="titleMedium"
        style={{fontWeight: 'bold', marginBottom: gaps.m}}>
        Evolution Chain
      </Text>
      <View style={styles.evolutionWrapper}>
        {evolution.map((item, index) => (
          <View key={index} style={styles.evolutionContainer}>
            <View style={styles.evolutionItem}>
              <FadeInImage
                uri={getImageLink(getIdFromUrl(item.url))}
                style={{width: 80, height: 80}}
              />
              <Text>{Formatter.capitalize(item.name)}</Text>
            </View>
            {index !== evolution.length - 1 && (
              <View style={styles.evolutionArrow}>
                <Icon name="arrow-right" size={20} />
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: gaps.m,
  },
  evolutionWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  evolutionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  evolutionItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  evolutionArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
