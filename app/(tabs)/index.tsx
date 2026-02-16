import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

import IconCategoryButon from '@/components/new/IconCategoryButon';
import ProductCard from '@/components/new/ProductCard';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { apiDistelsa } from '@/services/apiDistelsa.service';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [data, setData] = useState([])
  const [products, setProducts] = useState([])
  const getData = async()=>{
    const data = await apiDistelsa.getData("catalogs/categories/summary?categoryDepth=5&categoryType=Base%2CPromoci%C3%B3n")
    setData(data.children)
  }
  const getProducts = async()=>{
    const data = await apiDistelsa.getProductsByTarget()
    setProducts(data.products)
  }

  useEffect(()=>{
    getData()
    getProducts()
  }, [])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{uri: "https://www.max.com.gt/assets/home_herobanner_sm_lenovo_e6fa77508f.webp"}}
          style={styles.reactLogo}
        />
      }>
        <View>
        <TextInput placeholder='Buscar...' style={{backgroundColor: "white", padding: 10, borderRadius: 10, marginHorizontal: 10, borderColor: "red", borderWidth: 1}} />
        <TouchableHighlight onPress={() => console.log("hola")} style={{backgroundColor: "red", padding: 10, borderRadius: 10, marginHorizontal:10}}>
          <Text style={{color: "white", fontWeight: "bold", textAlign: "center"}}>Buscar</Text>
        </TouchableHighlight>
        </View>
        <ScrollView horizontal style={{gap: 10, padding: 10}}>
        {
          data && data.map((item:any)=> <IconCategoryButon key={item.title} item={item} />)

        }
      </ScrollView>
      {products && products.map((item:any)=> <ProductCard key={item.description} item={item} />)}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 250,
    width: 500,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
