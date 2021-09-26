import { useRouter } from "next/dist/client/router";
import { useAuthState } from "react-firebase-hooks/auth";
import DashboardMenu from "../components/DashboardMenu";
import { firebase } from "../firebase/firebase";
import { useEffect, useState } from "react";
import Head from "next/head";
const Dashboard = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const router = useRouter();

  useEffect(() => {
    console.log(user, " user");
    if (!user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="">
      <Head>
        <title>Dashboard | HaveBeen</title>
        <meta content="travel, diary, places, have been, been, havebeen" />
      </Head>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="m-4 flex justify-center items-center flex-col">
          <h1 className=" text-2xl self-start">
            Hi, {user.displayName.split(" ")[0]}!
          </h1>

          <DashboardMenu />

          <button
            onClick={() => {
              firebase.auth().signOut();
              router.back();
            }}
            className="absolute -top-1 right-3 px-3 py-3 bg-gray-800 rounded-md"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
