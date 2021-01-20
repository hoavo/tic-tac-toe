export const generateBoardData = (size) => {
  return new Array(Number(size))
    .fill('')
    .map(() => new Array(Number(size)).fill(''));
};

export const checkWinner = (board, row, index, value) => {
  const size = board.length;
  var columnVal = 0,
    rowVal = 0,
    crossVal = 0,
    rCrossVal = 0;

  for (let i = 0; i < size; i++) {
    if (board[row][i] === value) {
      columnVal++; //check win column
    }
    if (board[i] && board[i][index] === value) {
      rowVal++; //check win row
    }
    if (board[i] && board[i][i] === value) {
      crossVal++;
    }
    if (board[i] && board[i][size - (i + 1)] === value) {
      rCrossVal++;
    }
  }

  return (
    rowVal === size ||
    columnVal === size ||
    crossVal === size ||
    rCrossVal === size ||
    false
  );
};
