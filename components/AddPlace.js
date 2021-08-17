import Map from "./Map";
import { useEffect, useState } from "react";
import { auth, db, firebase } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CountryDropdown } from "react-country-region-selector";
import DatePicker from "react-datepicker";
import { useToast } from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";

const AddPlace = () => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(new Date());

  const [coords, setCoords] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const toast = useToast();

  const handleAddPlace = async (e) => {
    e.preventDefault();
    await db
      .collection("users")
      .doc(user.uid)
      .collection("places")
      .add({
        name,
        place,
        country,
        desc,
        date,
        coords,
      })
      .then(() => {
        toast({
          title: "Place added.",
          description: "We've succesfully added your place.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <div>
      <form
        onSubmit={handleAddPlace}
        className="flex flex-col justify-center items-center bg-gray-800 p-4 rounded-md space-y-2"
        style={{ width: "90vw", maxWidth: "90vw"}}
      >
        <div className="flex justify-evenly items-center w-full">
          <label className="self-start" htmlFor="name">
            Name
          </label>
          <input
            className="text-black"
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>
        <div className="flex justify-evenly items-center w-full">
          <label className="self-start" htmlFor="place">
            Located at
          </label>
          <input
            className="text-black"
            id="place"
            type="text"
            onChange={(e) => setPlace(e.target.value)}
            autoComplete="place"
          />
        </div>
        <CountryDropdown
          value={country}
          onChange={(value) => setCountry(value)}
          className="text-black w-11/12 lg:w-1/2"
          style={{ maxWidth: "60%" }}
        />
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="desc">Description</label>
          <input
            className="text-black"
            id="desc"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            autoComplete="desc"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1>Select date:</h1>
          <DatePicker
            selected={date}
            className="text-black rounded-md p-1 self-center"
            onChange={(date) => setDate(date)}
          />
        </div>
        <div className="map w-full lg:w-4/12 " style={{ height: "80vw" }}>
          <Map coords={coords} setCoords={setCoords} />
        </div>
        <style jsx>
          {`
            @media (min-width: 1024px) {
              .map {
                height: 30vw !important;
              }
            }
          `}
        </style>
        <button className="px-2 py-3 bg-red-500 rounded-md mt-2" type="submit">
          Add Place
        </button>
      </form>
    </div>
  );
};

export default AddPlace;
