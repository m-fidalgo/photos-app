import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import PictureList from "./app/components/PictureList";
import CameraDialog from "./app/components/CameraDialog";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState([
    {
      id: "1",
      url:
        "http://www.daninoce.com.br/wp-content/uploads/2017/10/dani-noce-bolo-brigadeiro-morango-imagem-destaque.jpg",
    },
    {
      id: "2",
      url:
        "http://www.daninoce.com.br/wp-content/uploads/2017/10/dani-noce-bolo-brigadeiro-morango-imagem-destaque.jpg",
    },
    {
      id: "3",
      url:
        "http://www.daninoce.com.br/wp-content/uploads/2017/10/dani-noce-bolo-brigadeiro-morango-imagem-destaque.jpg",
    },
    {
      id: "4",
      url:
        "http://www.daninoce.com.br/wp-content/uploads/2017/10/dani-noce-bolo-brigadeiro-morango-imagem-destaque.jpg",
    },
  ]);

  function onPictureSelect(item) {
    console.log("a");
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <View style={styles.container}>
      <PictureList list={list} onClick={onPictureSelect} />
      <View style={styles.footer}>
        <Button onPress={openModal} title="Nova Foto" color="#0062ac" />
      </View>
      <CameraDialog isOpen={isModalOpen} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  footer: {
    padding: 15,
    backgroundColor: "#999",
    width: "100%",
    textAlign: "center",
  },
});

export default App;
