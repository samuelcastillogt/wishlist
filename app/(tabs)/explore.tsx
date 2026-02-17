import { StatusBar, StyleSheet, View } from 'react-native';
import EmptyCartIcon from '@/components/new/EmptyCartIcon';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <EmptyCartIcon width={133} height={130} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
