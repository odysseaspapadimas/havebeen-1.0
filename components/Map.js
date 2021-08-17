import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const Map = ({ coords, setCoords }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP_API_KEY }}
        defaultCenter={{ lat: 38.22, lng: 21.79 }}
        defaultZoom={11}
        onClick={({ x, y, lat, lng }) => {
          setCoords([lat, lng]);
        }}
      >
        {coords.length > 0 && <Marker lat={coords[0]} lng={coords[1]} />}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
