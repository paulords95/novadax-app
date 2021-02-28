import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";

import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KeyPage = () => {
  let [fontsLoaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  const [defaultValue, setDefaultValue] = useState("");
  const [keys, setKeys] = useState({
    accessKey: "",
    secretKey: "",
    defined: false,
  });

  const storeKeys = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("keys", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getKeys = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("keys");
      const result = JSON.parse(jsonValue);

      if (result != null) {
        return result;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      const keys = await getKeys();
      if (keys != undefined) {
        setKeys({
          accessKey: keys.accessKey,
          secretKey: keys.secretKey,
          defined: true,
        });
        setDefaultValue("*************************************");
      }
    })();
  }, []);

  if (!fontsLoaded) {
    return <Text>Carregando</Text>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Definir Chaves de API</Text>
        <View style={styles.body}>
          <Text style={styles.subTitle}>
            É necessário gerar chaves de API na página da NovaDAX, é preciso
            somente permissão para leitura e consulta.
          </Text>
          <Text style={styles.inputTitle}>Access Key</Text>
          <TextInput
            placeholder={defaultValue}
            style={styles.publicKeyInput}
            onChangeText={(text) => {
              setKeys({
                accessKey: text,
                secretKey: keys.secretKey,
                defined: keys.defined,
              });
            }}
            textContentType="password"
          />
          <Text style={styles.inputTitle}>Secret Key</Text>
          <TextInput
            placeholder={defaultValue}
            style={styles.publicKeyInput}
            onChangeText={(text) => {
              setKeys({
                accessKey: keys.accessKey,
                secretKey: text,
                defined: keys.defined,
              });
            }}
            textContentType="password"
          />
          <RectButton
            style={styles.saveBtn}
            onPress={async () => {
              if (keys.defined) {
                try {
                  await AsyncStorage.removeItem("keys");
                } catch (e) {
                  console.log(e);
                }
                setDefaultValue("");
                setKeys({
                  accessKey: keys.accessKey,
                  secretKey: keys.accessKey,
                  defined: false,
                });
              } else if (
                keys.accessKey.length < 5 ||
                keys.secretKey.length < 5
              ) {
                setDefaultValue("Valor inválido");
                console.log(keys);
              } else {
                setKeys({
                  accessKey: keys.accessKey,
                  secretKey: keys.accessKey,
                  defined: true,
                });
                storeKeys(keys);
                setDefaultValue("*************************************");
              }
            }}
          >
            <Text style={styles.saveBtnTxt}>
              {keys.defined ? "Apagar" : "Salvar"}
            </Text>
          </RectButton>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#4C66AB",
  },
  body: {
    backgroundColor: "#743095",
    height: "84%",
    width: "92%",
    borderRadius: 10,
    zIndex: 1,
    elevation: 5,
    alignItems: "center",
    top: 60,
  },
  title: {
    justifyContent: "center",
    color: "white",
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 19,
    top: 50,
  },
  subTitle: {
    color: "#C6BDBD",
    fontFamily: "Nunito_400Regular",
    width: "70%",
    alignSelf: "center",
    textAlign: "justify",
    marginTop: 30,
  },
  publicKeyInput: {
    height: 40,
    borderColor: "#C6BDBD",
    color: "white",
    borderWidth: 1,
    width: "80%",
    borderRadius: 4,
    paddingHorizontal: 15,
    marginTop: 2,
    marginBottom: 20,
    textAlign: "center",
  },
  inputTitle: {
    marginTop: 20,
    color: "white",
    marginLeft: "-60%",
    fontFamily: "Nunito_600SemiBold",
  },
  saveBtnTxt: {
    color: "white",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  saveBtn: {
    backgroundColor: "#206DB0",
    borderRadius: 5,
    marginTop: 15,
    elevation: 2,
  },
});

export default KeyPage;
