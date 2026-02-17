import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import IconCategoryButon from '@/components/new/IconCategoryButon';
import ProductCard from '@/components/new/ProductCard';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { apiDistelsa } from '@/services/apiDistelsa.service';
import { useEffect, useState } from 'react';
//import { constants } from '@/constants/constants';
export default function HomeScreen() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  const getData = async () => {
    const data = await apiDistelsa.getData('catalogs/categories/summary?categoryDepth=5&categoryType=Base%2CPromoci%C3%B3n');
    setCategories(data.children ?? []);
  };

  const getProducts = async () => {
    const data = await apiDistelsa.getProductsByTarget();
    setProducts(data.products ?? []);
  };

  const searchProduct = async (term: string) => {
    const value = term.trim();
    if (!value) {
      setSuggestions([]);
      setRelatedProducts([]);
      return;
    }

    const data = await apiDistelsa.getSearchProduct(value);
    const sections = data?.sections ?? {};
    const nextSuggestions = sections['Search Suggestions'] ?? sections.searchSuggestions ?? [];
    const nextRelatedProducts = sections.products ?? sections.Products ?? [];

    setSuggestions(Array.isArray(nextSuggestions) ? nextSuggestions : []);
    setRelatedProducts(Array.isArray(nextRelatedProducts) ? nextRelatedProducts : []);
  };

  useEffect(() => {
    getData();
    getProducts();
  }, []);

  const getSuggestionLabel = (item: any) => item?.value ?? '';
  const getSuggestionKey = (item: any, index: number) => item?.data?.id ?? `${item?.value ?? 'suggestion'}-${index}`;

  const getRelatedImage = (item: any) =>
    item?.image_url ??
    item?.imageUrl ??
    item?.data?.image_url ??
    item?.data?.imageUrl ??
    item?.data?.metadata?.image_url ??
    '';

  const getRelatedBrand = (item: any) =>
    item?.brand ??
    item?.data?.brand ??
    item?.data?.metadata?.brand ??
    item?.data?.brand_name ??
    'Marca';

  const getRelatedTitle = (item: any) =>
    item?.value ??
    item?.name ??
    item?.data?.name ??
    item?.data?.id ??
    'Producto';

  const getRelatedPrice = (item: any) =>
    item?.price ??
    item?.data?.price ??
    item?.data?.metadata?.price ??
    item?.data?.formatted_price ??
    null;

  const formatPrice = (price: any) => {
    if (typeof price === 'number') {
      return `Q${price.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (typeof price === 'string') {
      return price.startsWith('Q') ? price : `Q${price}`;
    }
    return null;
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{ uri: 'https://www.max.com.gt/assets/home_herobanner_sm_lenovo_e6fa77508f.webp' }}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.searchHeader}>
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Buscar..."
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              if (!text.trim()) {
                setSuggestions([]);
                setRelatedProducts([]);
                return;
              }
              searchProduct(text);
            }}
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => searchProduct(search)}>
            <MaterialIcons name="search" size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSearch('');
              setSuggestions([]);
              setRelatedProducts([]);
            }}
          >
            <MaterialIcons name="close" size={20} color="#black" />
          </TouchableOpacity>
        </View>
      </View>

      {(suggestions.length > 0 || relatedProducts.length > 0) && (
        <View style={styles.recommendationSection}>
          <Text style={styles.sectionTitle}>Encontramos esto para ti</Text>
          <View style={styles.suggestionsList}>
            {suggestions.map((item: any, index: number) => (
              <TouchableOpacity
                key={getSuggestionKey(item, index)}
                style={styles.suggestionRow}
                onPress={() => {
                  const selected = getSuggestionLabel(item);
                  setSearch(selected);
                  setSuggestions([]);
                  searchProduct(selected);
                }}
              >
                <Text style={styles.suggestionLabel}>{getSuggestionLabel(item)}</Text>
                <MaterialIcons name="north-east" size={14} color="#1f2d3d" />
              </TouchableOpacity>
            ))}
          </View>

          {relatedProducts.length > 0 && (
            <>
              <View style={styles.divider} />
              <Text style={styles.sectionTitle}>Te recomendamos</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedRow}>
                {relatedProducts.map((item: any, index: number) => {
                  const image = getRelatedImage(item);
                  const brand = getRelatedBrand(item);
                  const title = getRelatedTitle(item);
                  const price = formatPrice(getRelatedPrice(item));

                  return (
                    <View key={`${title}-${index}`} style={styles.relatedCard}>
                      {image ? (
                        <Image source={{ uri: image }} style={styles.relatedImage} contentFit="contain" />
                      ) : (
                        <View style={styles.relatedImagePlaceholder} />
                      )}
                      <Text style={styles.relatedBrand}>
                        Marca: <Text style={styles.relatedBrandValue}>{brand}</Text>
                      </Text>
                      <Text style={styles.relatedTitle} numberOfLines={2}>
                        {title}
                      </Text>
                      {price ? <Text style={styles.relatedPrice}>{price}</Text> : null}
                    </View>
                  );
                })}
              </ScrollView>
            </>
          )}
        </View>
      )}

      <ScrollView horizontal style={{ gap: 10, padding: 10 }}>
        {categories && categories.map((item: any) => <IconCategoryButon key={item.title} item={item} />)}
      </ScrollView>
      <Text style={styles.productsTitle}>Productos que te pueden gustar</Text>
      {products && products.map((item: any) => <ProductCard key={item.description} item={item} />)}
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
  searchHeader: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 18,
    borderColor: "red",
    borderWidth: 1,
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F1C35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationSection: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 12,
  },
  sectionTitle: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  suggestionsList: {
    paddingHorizontal: 12,
    gap: 12,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  suggestionLabel: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
    textTransform: 'lowercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#D1D5DB',
    marginTop: 16,
    marginBottom: 18,
  },
  relatedRow: {
    paddingHorizontal: 12,
    gap: 12,
    paddingBottom: 6,
  },
  relatedCard: {
    width: 190,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 10,
    gap: 6,
  },
  relatedImage: {
    height: 96,
    width: '100%',
  },
  relatedImagePlaceholder: {
    height: 96,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  relatedBrand: {
    fontSize: 14,
    color: '#374151',
  },
  relatedBrandValue: {
    fontSize: 14,
    color: '#2563EB',
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  relatedTitle: {
    color: '#111827',
    fontSize: 18,
    minHeight: 42,
  },
  relatedPrice: {
    color: '#111827',
    fontSize: 26,
    fontWeight: '700',
  },
  productsTitle: {
    color: '#1f2937',
    fontSize: 28,
    fontWeight: '700',
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 6,
  },
});
