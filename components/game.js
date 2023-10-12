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
import { useState, useEffect, useRef } from "react";
import Obstacle from "./obstacle";
import Alturawidth from "../contextos/alturawidth";
export default function Game() {
  //limite 600 top
  const { height, width } = useWindowDimensions();
  const [top, SetTop] = useState(new Animated.Value(10));
  const fallingref = useRef(null);
  const userclickref = useRef(null);
  const clickcheck = useRef(undefined);
  const [limitwidth, Setlimitwidth] = useState(undefined);

  const para = () => {
    if (fallingref.current) {
      top.setValue(10);
      fallingref.current.stop();
    }
  };

  const userclick = (click) => {
    if (clickcheck.current) {
      userclickref.current = Animated.timing(top, {
        toValue: click,
        duration: 100,
        useNativeDriver: false,
      });
      userclickref.current.start(({ finished }) => {
        if (finished) {
          start();
        }
      });
      clickcheck.current = false;
    } else clickcheck.current = true;
  };

  const start = () => {
    fallingref.current = Animated.timing(top, {
      toValue: clickcheck.current ? height + 180 : 680,
      duration: 4000,
      useNativeDriver: false,
    });
    if (fallingref.current) {
      fallingref.current.start();
      top.addListener((value) => {
        const atual = value.value;
        if (clickcheck.current) {
          userclick(atual - 180);
          console.log();
        }
        if (atual >= 680) {
          // alert("você perdeu");
          fallingref.current.stop();
        }
      });
    }
  };
  // useEffect(() => {
  //   start();
  // }, []);

  return (
    <View style={gmstyle.container}>
      <Image
        source={require("../assets/background.png")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      ></Image>
      {/* consigo pegar a width que o cano está */}
      <Alturawidth.Provider value={{ Setlimitwidth }}>
        <Obstacle />
      </Alturawidth.Provider>
      <View style={{ alignItems: "center", paddingTop: 300 }}>
        <TouchableOpacity onPress={userclick}>
          <Animated.View
            style={{
              backgroundColor: "black",
              width: 100,
              height: 100,
              top: top,
            }}
          ></Animated.View>
        </TouchableOpacity>
        {/* <TouchableOpacity>
        <Image
          source={require("../assets/bird.png")}
          style={{ height: 100, width: 100 }}
        ></Image>
      </TouchableOpacity> */}

        <Button onPress={para} title="stop"></Button>
        <Button onPress={start} title="start"></Button>
      </View>
    </View>
  );
}
