import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export function MapMarker({ locais, selectedLocation }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], 15, {
        animate: true,
      });
    } else if (locais.length > 0) {
      const listLocationFirst = locais[0];

      map.flyTo(
        {
          lat: listLocationFirst.latitude,
          lng: listLocationFirst.longitude,
        },
        13,
        { animate: true }
      );
    }
  }, [selectedLocation, locais]);
  return (
    <>
      {locais.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>
            <h2>{item.local}</h2>
            <p>{item.descricao}</p>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
