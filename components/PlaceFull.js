import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase/firebase";
import { useEffect } from "react";

const PlaceFull = ({ docId }) => {
  const [user, loading, error] = useAuthState(auth);
  const [snapshot, docLoading, docError] = useDocumentOnce(
    db.collection("users").doc(user.uid).collection("places").doc(docId)
  );

  useEffect(() => {
    console.log(snapshot?.data());
  }, [snapshot]);

  return (
    <div>
      {docLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {snapshot.data().name}
          {snapshot.data().place && <span>, {snapshot.data().place}</span>}
          <p>{snapshot.data().desc}</p>
        </div>
      )}
    </div>
  );
};

export default PlaceFull;
