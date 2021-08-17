import GoogleMapReact from "google-map-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase/firebase";
import Marker from "./Marker";

const PlacesOnMap = ({ center, zoom, setSelectedPlace }) => {
  const [user, loading, error] = useAuthState(auth);
  const [snapshot, colLoading, colError] = useCollectionOnce(
    db.collection("users").doc(user.uid).collection("places")
  );

  const markers =
    !colLoading &&
    snapshot.docs.map((doc) => {
      return (
        <Marker
          key={doc.data().coords[0]}
          lat={doc.data().coords[0]}
          lng={doc.data().coords[1]}
          name={doc.data().name}
          place={doc.data().place}
          desc={doc.data().desc}
          docId={doc.id}
          setSelectedPlace={setSelectedPlace}
        />
      );
    });

  return (
    <div style={{ height: "100vw", width: "100vw" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP_API_KEY }}
        defaultCenter={{ lat: 38.22, lng: 21.79 }}
        defaultZoom={6}
        center={center}
        zoom={zoom}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};

export default PlacesOnMap;
