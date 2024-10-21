import {gaps} from '@theme/gaps';
import {sizes} from '@theme/sizes';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 999,
    height: 200,
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'column',
    paddingHorizontal: gaps.s,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  headerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTexts: {
    color: 'white',
    fontSize: sizes.l,
    alignSelf: 'flex-start',
  },
  typesContainer: {flexDirection: 'row', top: -20},
  pokeball: {
    width: 200,
    height: 200,
    bottom: -20,
    opacity: 0.6,
    margin: 'auto',
    zIndex: -1,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -30,
    zIndex: 1000,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  navigationContainer: {
    height: 600,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
});
