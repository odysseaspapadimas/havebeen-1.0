import { useEffect } from "react";
import Head from "next/head";
import { db, firebase } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useRouter } from "next/dist/client/router";
import { doesUserExist } from "../services/firebase";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/dashboard",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const Home = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  const router = useRouter();
  useEffect(() => {
    const checkIfUserExists = async () => {
      const data = await doesUserExist(user.uid);
      return data;
    };
    if (user) {
      console.log(!!!checkIfUserExists(), "ezz");
      if (!!checkIfUserExists) {
        console.log("creating new user doc");
        db.collection("users").doc(user.uid).set({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
      router.push("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="">
      <Head>
        <title>HaveBeen. Places you have been.</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta content="travel, diary, places, have been, been, havebeen" />
      </Head>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <main
          className="flex flex-col justify-center items-center"
          style={{ height: "100vh" }}
        >
          <div
            className="px-3 py-4 bg-gray-800 rounded-md flex flex-col justify-center items-center space-y-2"
            style={{ height: "25vh" }}
          >
            <h1>Hello, welcome to HaveBeen</h1>

            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;
