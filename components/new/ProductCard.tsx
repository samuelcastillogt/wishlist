import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProductCardProps = {
  item: any;
  onViewDetails?: (item: any) => void;
};

function ProductCard({ item, onViewDetails }: ProductCardProps) {
  const imageUrl = item?.thumbnailImage?.url ?? '';
  const title = typeof item?.title === 'string' || typeof item?.title === 'number'
    ? String(item.title)
    : (item?.title?.title ?? item?.title?.name ?? 'Producto');
  const regularPrice = item?.prices?.regularPrice?.value;

  return (
    <View style={styles.container} >
        {imageUrl ? <Image source={imageUrl} style={{width: 100, height: 100}} /> : <View style={{width: 100, height: 100}} />}
        <Text style={{fontSize: 15, color: "black", textAlign: "center"}}>{title}</Text>
        <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
        {regularPrice != null && <Text style={{fontSize: 14, color: "black", fontWeight: "bold", textDecorationLine: "line-through"}}>Q.{regularPrice}.00</Text>}
        </View>
        <TouchableOpacity style={styles.detailsButton} onPress={() => onViewDetails?.(item)}>
          <Text style={styles.detailsButtonText}>Ver detalles</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },
    detailsButton: {
      marginTop: 4,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: "#E10812",
    },
    detailsButtonText: {
      color: "#fff",
      fontWeight: "700",
    }
})

export default ProductCard
