import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { styles } from "./style";
import { Icon } from "leaflet";
import "Leaflet/dist/leaflet.css";

export default function MapApp() {
  const [location, setLocation] = useState({ lat: -8.0584933, lon: -34.8848193 });
  const [locationName, setLocationName] = useState('Recife')
  const [inputLocation, setInputLocation] = useState('');
  const customIcon = new Icon({
    iconUrl: "   https://cdn-icons-png.flaticon.com/512/3180/3180209.png ",
    iconSize: [38,38]
  })


  var api_key = 'b853c4734b0342e298016b00ff4906e8';

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${inputLocation}&key=${api_key}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      setLocation({ lat, lon: lng });
      setLocationName(data.results[0].formatted)
    }
  }

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
         async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`
              );
            const data = await response.json();

            if (data.results.length > 0) {
          const locationName = data.results[0].formatted;

          setLocationName(locationName)
          setLocation({ lat: latitude, lon: longitude, name: locationName });
        }
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
        );
    }
  }

  return (
    <div style={{ ...styles.container, height: '100vh', display: 'flex' }}>
      <div style={styles.formColumn}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Local:
            <input
              type="text"
              value={inputLocation}
              onChange={(e) => setInputLocation(e.target.value)}
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>Buscar Local</button>
          <button type='button' onClick={getCurrentLocation}>Usar Localização Atual</button> 
        </form>
      </div>
      <div style={styles.mapColumn}>
        <MapContainer
            key={`${location.lat}-${location.lon}`}
            center={[location.lat, location.lon]}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.lat, location.lon]} icon={customIcon}>
            <Popup>{locationName}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}
