import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import Header from 'components/Header';
import Grid from 'components/Grid';
import {generateBoardData, checkWinner} from 'utils';

const SIZE_BOARD = 3;
const PLAYERS = [
  {
    value: 'X',
    active: true,
    timeWin: 0,
  },
  {
    value: 'O',
    timeWin: 0,
  },
];

let countCheck = 0;

const App = () => {
  const [board, setBoard] = useState(generateBoardData(SIZE_BOARD));
  const [players, setPlayers] = useState(PLAYERS);
  const [sizeBoard, setSizeBoard] = useState(SIZE_BOARD);

  React.useEffect(() => {
    setBoard(generateBoardData(sizeBoard));
  }, [sizeBoard]);
  const onPress = (row, index) => {
    if (board[row][index]) {
      return;
    }
    countCheck++;
    const player = players.find((itm) => itm.active);
    board[row][index] = player.value;
    setBoard([...board]);

    if (checkWinner(board, row, index, player.value)) {
      const playersUpdate = players.map((itm) => {
        if (itm.value === player.value) {
          itm.timeWin += 1;
        }
        itm.active = false;
        return itm;
      });
      playersUpdate[0].active = true;
      setPlayers(playersUpdate);
      Alert.alert('Winner!', `Player ${player.value} Win!`, [
        {
          text: 'Start',
          onPress: () => {
            countCheck = 0;
            setBoard(generateBoardData(sizeBoard));
          },
        },
      ]);
    } else if (countCheck === sizeBoard * sizeBoard) {
      Alert.alert('Draw!', 'No Player Win!', [
        {
          text: 'Start',
          onPress: () => {
            countCheck = 0;
            setBoard(generateBoardData(sizeBoard));
          },
        },
      ]);
    } else {
      setPlayers(
        players.map((itm) => {
          itm.active = !itm.active || false;
          return itm;
        }),
      );
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Header players={players} />
        <View style={styles.wrapperSetSizeBoard}>
          <Text>Set size booard:</Text>
          <TextInput
            style={styles.inputSize}
            type="number"
            editable={countCheck === 0}
            onChangeText={(text) => {
              const number = Number(text);
              if (!Number.isInteger(number) || number > 5) {
                Alert.alert('Please input size board is Number and <6');
                return;
              }
              setSizeBoard(number);
            }}
            defaultValue={String(sizeBoard)}
          />
        </View>
        <Grid data={board} onPress={onPress} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapperSetSizeBoard: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSize: {
    width: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    padding: 5,
  },
});
export default App;
