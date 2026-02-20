import { StatusBar, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import EmptyCartIcon from '@/components/new/EmptyCartIcon';
import useStore from '@/store/index';

export default function TabTwoScreen() {
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <EmptyCartIcon width={133} height={130} />
          <Text style={styles.emptyTitle}>Tu carrito esta vacio</Text>
          <Text style={styles.emptySubtitle}>Agrega productos desde la pantalla principal.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          <Text style={styles.title}>Tu carrito</Text>
          {cart.map((item) => (
            <View key={item.id} style={styles.card}>
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.cardImage} contentFit="contain" />
              ) : (
                <View style={styles.cardImagePlaceholder} />
              )}
              <View style={styles.cardBody}>
                <Text style={styles.cardBrand}>{item.brand}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDetail}>Cantidad: {item.quantity}</Text>
                <Text style={styles.cardPrice}>
                  Q{(item.price * item.quantity).toLocaleString('es-GT', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total: Q
              {total.toLocaleString('es-GT', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
              <Text style={styles.clearButtonText}>Vaciar carrito</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  listContainer: {
    paddingBottom: 24,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    gap: 10,
  },
  cardImage: {
    width: 72,
    height: 72,
  },
  cardImagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  cardBody: {
    flex: 1,
    gap: 3,
  },
  cardBrand: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 13,
  },
  cardTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  cardDetail: {
    color: '#4B5563',
    fontSize: 13,
  },
  cardPrice: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
  },
  footer: {
    marginTop: 8,
    gap: 10,
  },
  totalText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  clearButton: {
    backgroundColor: '#E10812',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
