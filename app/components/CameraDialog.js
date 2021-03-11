import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";

export default function CameraDialog(props) {
  const [currentImage, setCurrentImage] = useState(
    "http://www.daninoce.com.br/wp-content/uploads/2017/10/dani-noce-bolo-brigadeiro-morango-imagem-destaque.jpg"
  );

  function save() {
    props.onClose();
  }

  function shoot() {}

  function getImageFromClipboard() {}

  return (
    <Modal visible={props.isOpen} transparent={false} animationType="slide">
      <View style={styles.modalView}>
        <View style={styles.previewContainer}>
          <Image source={{ uri: currentImage }} style={styles.preview} />
          <TouchableOpacity onPress={props.onClose}>
            <Text style={styles.btnClose}>X</Text>
          </TouchableOpacity>
        </View>
        <View></View>
        <View style={styles.btnsContainer}>
          <Button title="Salvar" onPress={save} color="#0062ac" />
          <Button title="Bater" onPress={shoot} color="#0062ac" />
          <Button
            title="Colar"
            onPress={getImageFromClipboard}
            color="#0062ac"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
  },
  previewContainer: {
    backgroundColor: "gray",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preview: {
    width: 100,
    height: 75,
    borderWidth: 2,
    borderColor: "black",
  },
  btnClose: {
    padding: 14,
    backgroundColor: "red",
    fontSize: 20,
    color: "white",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 40,
    backgroundColor: "gray",
  },
});