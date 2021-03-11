import { Alert } from "react-native";
import fs from "react-native-fs";
import { NetworkService } from "./NetworkService";

export const PictureService = {
  async save(filePath) {
    if (filePath.startsWith("http")) {
      filePath = await PictureService.saveRemote(filePath);
    }

    return filePath;
  },
  async saveRemote(fromUrl) {
    const toFile = `${fs.DocumentDirectoryPath}/${Date.now()}.png`;
    result = await fs.downloadFile({
      fromUrl,
      toFile,
    });
    return "file://" + toFile;
  },
  selectPicture(item, onRemoveCallback) {
    Alert.alert(
      "Minha Imagem",
      item.id,
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
