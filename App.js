import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { StorageService } from "./app/services/StorageService";
import { PictureService } from "./app/services/PictureService";
import PictureList from "./app/components/PictureList";
import CameraDialog from "./app/components/CameraDialog";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    getItemsFromStorage();
  }, []);

  async function setStorage() {
    const pictureList = [
      {
        id: 1,
        url:
          "http://www.daninoce.com.br/wp-content/uploads/2017/10/dani-noce-bolo-brigadeiro-morango-imagem-destaque.jpg",
      },
      {
        id: 2,
        url:
          "https://thecookieshop.files.wordpress.com/2012/07/kitkat-rosa-low.jpg",
      },
    ];

    setList(pictureList);
    await StorageService.set("pictureList", pictureList);
  }

  async function getItemsFromStorage() {
    const pictureList = await StorageService.get("pictureList");
    setList(pictureList);
  }

  function onPictureSelect(item) {
    PictureService.selectPicture(item, onRemove);
  }

  async function onRemove(id) {
    let pictureList = list;
    pictureList = pictureList.filter((listItem) => listItem.id !== id);
    setList(pictureList);
    StorageService.set("pictureList", pictureList);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal(resp) {
    setIsModalOpen(false);

    if (typeof resp === "string") {
      const newItem = { url: resp, id: Date.now().toString() };
      const pictureList = [...list, newItem];
      setList(pictureList);
      StorageService.set("pictureList", pictureList);
    }
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
