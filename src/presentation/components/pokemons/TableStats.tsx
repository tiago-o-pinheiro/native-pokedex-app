import {gaps} from '@theme/gaps';
import {View, Text} from 'react-native';

interface TableProps {
  name: string;
  value?: string | number;
  children: React.ReactNode;
}

export const TableStat = ({name, value, children}: TableProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: gaps.m,
        marginBottom: gaps.m,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        {name ? (
          <Text style={{color: '#9d9d9d', fontWeight: 'bold'}}>{name}</Text>
        ) : null}
        {value ? (
          <Text
            style={{fontWeight: 'bold', color: '#3e3e3e'}}>{`${value}`}</Text>
        ) : null}
      </View>
      <View style={{flex: 2}}>{children}</View>
    </View>
  );
};
