import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Game from "./components/game";
import { useState } from "react";
export default function App() {
  const [startgame, setstargame] = useState(false);
  function start() {
    setstargame(!startgame);
  }

  return (
    <View style={styles.pai}>
      {!startgame ? (
        <TouchableOpacity style={styles.btnstart} onPress={start}>
          <Text style={styles.btntxt}>start</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.filho}>
          <Game />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  pai: {
    flex: 1, // Isso permite que o ComponentePai ocupe todo o espaço disponível na tela
    backgroundColor: "lightgray", // Apenas para visualização
    alignItems: "center", // Alinhe o filho ao centro horizontalmente
    justifyContent: "center", // Alinhe o filho ao centro verticalmente
  },
  filho: {
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
  },

  btnstart: {
    backgroundColor: "red",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
  },
  btntxt: {
    color: "white",
    fontSize: 14,
    textTransform: "uppercase",
  },
});
