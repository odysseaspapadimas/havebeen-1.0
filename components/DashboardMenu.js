import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AddPlace from "./AddPlace";
import Places from "./Places";
import PlacesOnMap from "./PlacesOnMap";
import { useState, useEffect } from "react";
import PlaceFull from "./PlaceFull";

const DashboardMenu = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [center, setCenter] = useState({ lat: 38.22, lng: 21.79 });
  const [zoom, setZoom] = useState(12);
  const [selectedPlace, setSelectedPlace] = useState(""); //place's document id

  const seeOnMap = (coords) => {
    const centerObj = { lat: coords[0], lng: coords[1] };
    setCenter(centerObj);
    setSelectedTab(2);
  };

  useEffect(() => {
    console.log(selectedPlace.length === 0, "place");
    if (selectedPlace) {
      setSelectedTab(0);
    }
  }, [selectedPlace]);

  return (
    <Tabs
      selectedIndex={selectedTab}
      onSelect={(index) => setSelectedTab(index)}
      className="flex flex-col justify-center items-center p-4"
      style={{ width: "100vw" }}
    >
      <TabList>
        <Tab onClick={() => setSelectedPlace("")}>Places</Tab>
        <Tab>Add new</Tab>
        <Tab>View on map</Tab>
      </TabList>

      <TabPanel>
        {selectedPlace.length === 0 ? (
          <Places seeOnMap={seeOnMap} setSelectedPlace={setSelectedPlace} />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <PlaceFull docId={selectedPlace} />
            <button className="p-3 mt-4 rounded-md bg-gray-800" onClick={() => setSelectedPlace("")}>Go back</button>
          </div>
        )}
      </TabPanel>
      <TabPanel>
        <AddPlace />
      </TabPanel>
      <TabPanel>
        <PlacesOnMap
          center={center}
          zoom={zoom}
          setSelectedPlace={setSelectedPlace}
        />
      </TabPanel>
    </Tabs>
  );
};

export default DashboardMenu;
