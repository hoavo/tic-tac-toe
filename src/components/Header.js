import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Player = ({data: {value, timeWin, active}}) => (
  <View style={styles.player}>
    <Text style={styles.turn}>{active ? 'Turn' : ''}</Text>
    <Text>{`Player ${value}`}</Text>
    <Text>{`${timeWin} ${timeWin > 1 ? 'wins' : 'win'}`}</Text>
  </View>
);

const Header = ({players = []}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tic Tac Toe</Text>
      <View style={styles.playerWrapper}>
        {players.map((itm, index) => (
          <Player key={index} data={itm} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, alignItems: 'center'},
  header: {fontSize: 24, color: 'red', padding: 20},
  player: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  playerWrapper: {flexDirection: 'row'},
  turn: {color: 'red'},
});

export default Header;
