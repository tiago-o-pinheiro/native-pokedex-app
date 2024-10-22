import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface SearchBar {
  value?: string;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  handleChange?: (query: string) => void;
  handlePress?: () => void;
}

export const SearchBar = ({
  value,
  placeholder,
  style,
  handleChange,
  handlePress,
}: SearchBar) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.inputContainer, style, {marginTop: top + 20}]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        onChangeText={handleChange}
        value={value}
        style={[styles.input]}
        activeUnderlineColor="transparent"
        textColor={'gray'}
        autoFocus
        autoCorrect={false}
        onPress={handlePress}
      />
      <View style={styles.icon}>
        <Icon name="magnifying-glass" size={20} color="gray" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    gap: 10,
  },
  input: {
    flex: 5,
    borderBottomWidth: 0,
    height: 30,
    color: 'black',
  },
  icon: {
    alignSelf: 'center',
    marginHorizontal: 20,
  },
});
