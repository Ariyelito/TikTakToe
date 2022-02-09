
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, Alert, TextInput } from 'react-native';
//import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';


export default class Labo1 extends Component {

  state = {
    gameBoard: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    currentPlayer: 1,
    round: 1,
    disabled: false,
    isLoggedIn: true,
    player1: 'Orlando',
    player2: 'Drena'
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

  // change gameboard[] & check if winner and alerts
  onTilePress = (row, col) => {
    // disable tile change if already clicked
    let tile = this.state.gameBoard[row][col];
    if (tile === 0) {
      // add round counter (extra)
      let nextRound = this.state.round + 1;
      this.setState({ round: nextRound });
      // get current player
      let current = this.state.currentPlayer
      // set correct tile
      let arr = this.state.gameBoard.slice();
      arr[row][col] = current;
      this.setState({ gameBoard: arr });

      // switch player
      current = (current === 1) ? -1 : 1;
      this.setState({ currentPlayer: current });

      //check if winner
      let winner = this.checkIfWin();

      if (winner === 1 || winner === -1) {
        let w = winner === -1 ? 2 : 1
        Alert.alert(`Joueur ${w} a gagné!`);
        this.setState({ disabled: true });
      }
      //check if draw
      if (this.state.round === 9 && winner === 0) {
        Alert.alert(
          "Match nul.");
        this.setState({ disabled: true });
        //this.resetGame();
      }

    }
  }

  // change display
  setIcon = (row, col) => {
    let value = this.state.gameBoard[row][col]
    switch (value) {
      case 1: return <Text style={[styles.icon, { color: '#006600' }]}>x</Text>
      case -1: return <Text style={[styles.icon, { color: '#992600' }]}>o</Text>
      default: return <Text></Text>
    }
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
      round: 1,
      disabled: false
    });
  }



  gotUsernames = () => {
    let p1 = this.state.player1 != '' ? true : false;
    let p2 = this.state.player2 != '' ? true : false;
    if (p1 && p2) {
      this.setState({ isLoggedIn: true });
      Alert.alert("Bienvenue", `Bienvenue ${this.state.player1} (X) et ${this.state.player2} (O), votre parti est commencé!`);
    } else {
      Alert.alert("Attention", "Veuillez rentrer vos noms d'utilisateur!");
    }
  }

  displayUsers = () => {
    let display = this.state.currentPlayer === 1 ? this.state.player1 : this.state.player2
    return <>
      <View style={{ flexDirection: "row" }}>
        <Text>Joueur 1:</Text>
        <Text style={{ marginLeft: 'auto' }}>Tour:</Text>
        <Text style={{ marginLeft: 'auto' }}>Joueur 2:</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.player1}>{this.state.player1}</Text>
        <Text style={{ marginLeft: 'auto' }}>{display + ' (' + this.state.round + ')'}</Text>
        <Text style={[styles.player2, { marginLeft: 'auto' }]}>{this.state.player2}</Text>
      </View>

    </>
  }

  render() {
    // if we got both usernames
    //let gotUsernames = (this.state.player1 === '' && this.state.player2 === '') ? false : true;
    if (this.state.isLoggedIn) {
      return (
        <View style={styles.container}>

          <View style={styles.topBar}>
            {this.displayUsers()}
          </View>

          <View style={styles.game}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
                {this.setIcon(0, 0)}
              </TouchableOpacity>

              <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
                {this.setIcon(0, 1)}
              </TouchableOpacity>

              <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
                {this.setIcon(0, 2)}
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
                {this.setIcon(1, 0)}
              </TouchableOpacity>

              <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onTilePress(1, 1)} style={styles.tile}>
                {this.setIcon(1, 1)}
              </TouchableOpacity>

              <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
                {this.setIcon(1, 2)}
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
                {this.setIcon(2, 0)}
              </TouchableOpacity>

              <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
                {this.setIcon(2, 1)}
              </TouchableOpacity>

              <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
                {this.setIcon(2, 2)}
              </TouchableOpacity>
            </View>
            <Pressable onPress={() => this.resetGame()} style={styles.button}><Text style={styles.text}>Nouvelle partie</Text></Pressable>
          </View>

        </View>
      );
    } else {
      return (
        <View style={[styles.container, styles.game]}>
          <Text style={{ color: 'black' }}>Joueur 1</Text>
          <TextInput

            placeholder="..." onChangeText={(value) => this.setState({ player1: value })}
            style={{ backgroundColor: 'white', padding: 1, minWidth: 150, textAlign: 'center', color: 'black' }}
          />
          <Text style={{ color: 'black' }}>Joueur 2</Text>
          <TextInput

            placeholder="..." onChangeText={(value) => this.setState({ player2: value })}
            style={{ backgroundColor: 'white', padding: 1, minWidth: 150, textAlign: 'center', color: 'black' }}
          />
          <Pressable onPress={() => this.gotUsernames()} style={styles.button}><Text style={styles.text}>Confirmer</Text></Pressable>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',

  },
  game: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topBar : {
    padding: 10,
    borderBottomColor : 'grey',
    borderBottomWidth : 1
  },
  player1: {
    color: '#006600',
  },

  player2: {
    color: '#992600',
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
    marginTop: 50,
  },
  text: {
    fontSize: 20,
    color: 'white'
  }
});

//export default Labo1
//export default Flex;
