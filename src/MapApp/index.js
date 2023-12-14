import React, { useState } from "react";
import { styles } from "./style";

export default function MapApp() {
    const [inputLocation, setInputLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(inputLocation)
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