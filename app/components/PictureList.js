import React from "react";
import { View, FlatList } from "react-native";
import PictureListItem from "./PictureListItem";

export default function PictureList(props) {
  const keyExtractor = (item) => item.id;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={3}
        data={props.list}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <PictureListItem onClick={props.onClick} item={item} />
        )}
      />
    </View>
  );
}
