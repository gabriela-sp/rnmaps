import { View } from 'react-native';
import { styles } from './styles';
import { useState, useEffect } from 'react';

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject
} from 'expo-location'

export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);

  async function requestLocationPermissions(){
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted){
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);


      console.log(currentPosition)
    }
  }

  useEffect(()=>{
    requestLocationPermissions();
  }, [])

  return (
    <View style={styles.container}>

    </View>
  );
}


