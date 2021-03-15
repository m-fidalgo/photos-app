import React, { useState, useRef } from "react";
import Clipboard from "@react-native-community/clipboard";
import { RNCamera } from "react-native-camera";
import { PictureService } from "../services/PictureService";
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
  const cameraRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(
    "http://www.daninoce.com.br/wp-content/uploads/2017/10/dani-noce-bolo-brigadeiro-morango-imagem-destaque.jpg"
  );

  async function save() {
    const resp = await PictureService.save(currentImage);
    props.onClose(resp);
  }

  async function shoot() {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setCurrentImage(data.uri);
    }
  }

  async function getImageFromClipboard() {
    const imageUrl = await Clipboard.getString();
    const extensions = ["png", "jpg", "jpeg"];
    const isImage = extensions.some((extension) =>
      imageUrl.toLowerCase().includes(extension)
    );

    if (isImage) {
      setCurrentImage(imageUrl);
    }
  }

  return (
    <Modal visible={props.isOpen} transparent={false} animationType="slide">
      <View style={styles.modalView}>
        <View style={styles.previewContainer}>
          <Image source={{ uri: currentImage }} style={styles.preview} />
          <TouchableOpacity onPress={props.onClose}>
            <Text style={styles.btnClose}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cameraContainer}>
          <RNCamera
            style={styles.camera}
            ref={cameraRef}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}
          />
        </View>
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
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
  },
  camera: {
    flex: 1,
    height: 250,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 40,
    backgroundColor: "gray",
  },
});
