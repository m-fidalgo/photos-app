import fs from "react-native-fs";
import Share from "react-native-share";

export const NetworkService = {
  async share(filePath) {
    const file = await fs.readFile(filePath, "base64");
    const resp = await Share.open({
      title: "Compartilhar",
      url: `data:image/png;base64,${file}`,
    });

    return resp;
  },
};
