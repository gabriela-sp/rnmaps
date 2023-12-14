import React, { useState } from "react";
import { styles } from "./style";

export default function MapApp() {
    const [location, setLocation] = useState({ lat: 0, lon: 0 });
    const [inputLocation, setInputLocation] = useState('');
    
    var api_key = 'b853c4734b0342e298016b00ff4906e8';

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${inputLocation}&key=${api_key}`
          );
          const data = await response.json();
            console.log(data)
          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            setLocation({ lat, lon: lng });
          }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                Local:
                <input
                    type="text"
                    value={inputLocation}
                    onChange={(e) => setInputLocation(e.target.value)}
                />
                </label>
                <button type="submit">Buscar Local</button>
            </form>
        </div>
    )
}