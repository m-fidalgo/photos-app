import React from "react";
import { Image, TouchableHighlight, Dimensions } from "react-native";

export default function PictureListItem(props) {
  const { width } = Dimensions.get("window");

  return (
    <TouchableHighlight
      onPress={() => {
        props.onClick(props.item);
      }}
    >
      <Image
        source={{ uri: props.item.url }}
        style={{
          width: width / 3 - 8,
          height: width / 3 - 8,
          margin: 2,
        }}
      />
    </TouchableHighlight>
  );
}
