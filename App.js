
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, Alert } from 'react-native';
//import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';


export default class Labo1 extends Component {

  state = {
    gameBoard: [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    currentPlayer: 1,
    round: 1,
  }

  // return 1 = p1 won, -1 = p2 won, 0 = draw
  checkIfWin = () => {
    const NB_TILES = 3;
    let board = this.state.gameBoard;
    let sum;
    //check rows
    for (let i = 0; i < NB_TILES; i++) {
      sum = board[i][0] + board[i][1] + board[i][2];
      if (sum === 3) { return 1; }
      else if (sum == -3) { return -1; }
    }
    // check columns...
    for (let i = 0; i < NB_TILES; i++) {
      sum = board[0][i] + board[1][i] + board[2][i];
      if (sum === 3) { return 1; }
      else if (sum === -3) { return -1; }
    }
    // check diagonals
    sum = board[0][0] + board[1][1] + board[2][2];
    if (sum === 3) { return 1; }
    else if (sum === -3) { return -1; }

    sum = board[2][0] + board[1][1] + board[0][2];
    if (sum === 3) { return 1; }
    else if (sum === -3) { return -1; }

    // draw
    return 0;
  }

  resetGame = () => {
    this.setState({
      gameBoard:
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
      currentPlayer: 1,
      round: 1
    });
  }

  setIcon = (row, col) => {
    let value = this.state.gameBoard[row][col]
    switch (value) {
      case 1: return <Text style={[styles.icon, { color: '#006600' }]}>x</Text>
      case -1: return <Text style={[styles.icon, { color: '#992600' }]}>o</Text>
      default: return <Text></Text>
    }
  }

  onTilePress = (row, col) => {
    // disable tile change if already clicked
    let tile = this.state.gameBoard[row][col];
    if (tile === 0) {
      // add round counter
      let nextRound = this.state.round + 1;
      this.setState({ round: nextRound });
      // get current player
      let current = this.state.currentPlayer

      // set correct tile
      let arr = this.state.gameBoard.slice();
      arr[row][col] = current;
      this.setState({ gameBoard: arr })

      // switch player
      current = (current === 1) ? -1 : 1;
      this.setState({ currentPlayer: current });

      //check if winner
      let winner = this.checkIfWin();
      if (winner === 1) {
        Alert.alert("Joueur 1 a gagné!");
        this.resetGame();
      } else if (winner === -1) {
        Alert.alert("Joueur 2 a gagné!");
        this.resetGame();
      }
      //check if draw
      if (this.state.round === 9 && winner === 0) {
        Alert.alert("Match nul.");
        this.resetGame();
      }

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.setIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.setIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
            {this.setIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.setIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={styles.tile}>
            {this.setIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.setIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {this.setIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.setIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
            {this.setIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <Pressable onPress={() => this.resetGame()} style={styles.button}><Text style={styles.text}>Nouvelle partie</Text></Pressable>


      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 5,
    width: 120,
    height: 120,
    borderColor: 'black',
  },
  icon: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 80,
    color: 'white'
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#006600',
    marginTop:50,
  },
  text: {
    fontSize:20,
    color:'white'
  }
});

//export default Labo1
//export default Flex;
