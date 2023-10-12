import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  Button,
  useWindowDimensions,
} from "react-native";
import gmstyle from "../estilos/gmstyle";
import { useState, useEffect, useRef, useContext } from "react";
import Alturawidth from "../contextos/alturawidth";

export default function Obstacle() {
  const { Setlimitwidth } = useContext(Alturawidth);
  const { height, width } = useWindowDimensions();
  const [marginLeft, setMarginleft] = useState(new Animated.Value(width));
  const leftref = useRef(undefined);
  const goleft = () => {
    leftref.current = Animated.timing(marginLeft, {
      toValue: -1,
      duration: 2000,
      useNativeDriver: false,
    });
    leftref.current.start();
    marginLeft.addListener((value) => {
      const valuewidth = value.value;
      if (valuewidth === width / 2) {
        alert("ta no meio");
        // não ta funcionando pois o valor width é bem preciso e o valor da animação não
        Setlimitwidth(valuewidth);
      }
    });
  };
  useEffect(() => {
    goleft();
    // alert(width / 2);
  }, []);
  return (
    <View>
      <Animated.View
        style={{
          backgroundColor: "black",
          position: "absolute",
          marginLeft: marginLeft,
        }}
      >
        <Image
          source={require("../assets/obstacle.png")}
          style={{
            height: height / 3,
            width: 50,
            alignSelf: "flex-start",
          }}
        ></Image>
      </Animated.View>
      {/* <View
        style={{
          height: 100,
          width: 100,
          backgroundColor: "black",
          marginTop: height / 3,
        }}
      ></View> */}
    </View>
  );
}
