import { firebase, db } from "../firebase/firebase";

export const doesUserExist = async (uuid) => {
  const doc = await db.collection("users").doc(uuid).get();
  return doc.data();
};
