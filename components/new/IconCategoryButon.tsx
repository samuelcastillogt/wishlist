import { colors, uris } from "@/constants/constants";
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
const IconCategoryButon = ({item}:{item:any}) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => console.log("hola")} style={styles.container}>
        <View style={{alignItems: "center"}}>
                <Image
          source={uris.media + item.icon}
          style={{ width: 40, height: 40 }} />
          <Text style={{fontSize: 12, color: colors.red, textAlign: "center", fontWeight: "bold"}}>{item.title}</Text>
        </View>

      </TouchableHighlight>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.red,
    width: 80,
    height:80,
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginHorizontal: 5,
    color: colors.red
  }
})

export default IconCategoryButon