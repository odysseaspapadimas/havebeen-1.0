import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebase, db, auth } from "../../firebase/firebase";
import Place from "./Place";

const Places = ({ seeOnMap, setSelectedPlace }) => {
  const [user, loading, error] = useAuthState(auth);
  const [snapshot, colLoading, colError] = useCollection(
    db.collection("users").doc(user.uid).collection("places")
  );

  return (
    <div>
      {colLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="space-y-5">
          {snapshot.docs.map((doc) => (
            <Place
              key={doc.id}
              docId={doc.id}
              name={doc.data().name}
              place={doc.data().place}
              desc={doc.data().desc}
              date={doc.data().date}
              coords={doc.data().coords}
              seeOnMap={seeOnMap}
              setSelectedPlace={setSelectedPlace}
              userUid={user.uid}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Places;
