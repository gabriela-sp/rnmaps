import React from 'react';
import { View } from "react-native";
import MapApp from './src/MapApp';

import { styles } from './styles';

export default function App() {
  return (
    <View style={styles.parentContainer}>
      <MapApp />
    </View>
  );
}


