import fs from "react-native-fs";

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
};
