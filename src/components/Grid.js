import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width - 20;

const Cell = ({label, height, onPress}) => (
  <TouchableOpacity onPress={onPress} style={[styles.cell, {height}]}>
    <Text style={[styles.text, {fontSize: 40 % height}]}>{label}</Text>
  </TouchableOpacity>
);

const Row = ({row, data, onPress}) => {
  return (
    <View style={styles.row}>
      {data.map((value, index) => (
        <Cell
          height={windowWidth / data.length}
          key={index}
          label={value}
          onPress={() => onPress(row, index)}
        />
      ))}
    </View>
  );
};
const Grid = ({data = [], onPress}) => {
  const generateBoard = () => {
    return data.map((itm, index) => (
      <Row key={index} row={index} data={itm} onPress={onPress} />
    ));
  };
  return <View style={styles.container}>{generateBoard()}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {flexDirection: 'row'},
  cell: {
    flex: 1,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
  },
});
export default Grid;
