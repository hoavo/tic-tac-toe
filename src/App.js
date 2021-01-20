import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
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

  const resetGame = () => {
    countCheck = 0;
    setBoard(generateBoardData(sizeBoard));
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Header players={players} />
        <View style={styles.wrapperSetSizeBoard}>
          <View style={styles.row}>
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
          <TouchableOpacity style={styles.buttonNewGame} onPress={resetGame}>
            <Text>New Game</Text>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputSize: {
    width: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    padding: 5,
    marginLeft: 10,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  buttonNewGame: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    padding: 10,
  },
});
export default App;
