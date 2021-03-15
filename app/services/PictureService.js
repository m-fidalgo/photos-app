import { Alert, Platform, PermissionsAndroid } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import fs from "react-native-fs";
import { NetworkService } from "./NetworkService";

export const PictureService = {
  async save(filePath) {
    if (filePath.startsWith("file:///")) {
      if (Platform.OS === "android") {
        let permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          filePath = PictureService.saveToCamera(filePath);
        } else {
          Alert.alert(
            "Permissão negada",
            "Deve-se permitir que o app acesse a galeria"
          );
        }
      } else {
        filePath = PictureService.saveToCamera(filePath);
      }
    } else if (filePath.startsWith("http")) {
      filePath = await PictureService.saveRemote(filePath);
      filePath = await PictureService.save(filePath);
    }

    return filePath;
  },
  async saveToCamera(filePath) {
    try {
      const url = await CameraRoll.save(filePath, "photo");
      return url;
    } catch (error) {
      console.log(error);
    }
  },
  async saveRemote(fromUrl) {
    const toFile = `${fs.DocumentDirectoryPath}/${Date.now()}.png`;
    const result = await fs.downloadFile({
      fromUrl,
      toFile,
    });
    await result.promise;

    return "file://" + toFile;
  },
  selectPicture(item, onRemoveCallback) {
    Alert.alert(
      "Minha Imagem",
      item.url,
      [
        {
          text: "Compartilhar",
          onPress: () => PictureService.onShare(item),
        },
        {
          text: "Apagar",
          onPress: () => onRemoveCallback(item.id),
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  },
  async onShare(item) {
    const resp = await NetworkService.share(item.url);
  },
};
