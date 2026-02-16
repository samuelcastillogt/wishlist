import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function ProductCard(item:any) {
    console.log(item.item.prices)
  return (
    <View style={styles.container}>
        <Image source={item.item.thumbnailImage.url} style={{width: 100, height: 100}} />
        <Text style={{fontSize: 15, color: "black", textAlign: "center"}}>{item.item.title}</Text>
        <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
        <Text style={{fontSize: 14, color: "white", backgroundColor: "red", padding: 5, fontWeight: "bold"}}>{item.item.prices.discount.percentOff}%</Text>
        <Text style={{fontSize: 14, color: "black", fontWeight: "bold", textDecorationLine: "line-through"}}>Q.{item.item.prices.regularPrice.value}.00</Text>
        </View>
        <Text style={{fontSize: 17, color: "black", fontWeight: "bold"}}>Q.{item.item.prices.salesPrice.value}.00</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }
})

export default ProductCard