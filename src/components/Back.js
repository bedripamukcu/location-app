import styled from "styled-components";
import { Map, TileLayer } from "react-leaflet";
import React, { useEffect, useRef } from "react";
import A from "leaflet";

const zoom = 15;
let db = [];
let _map;

const Back = () => {
  const mRef = useRef();

  useEffect(() => {
    const { current = {} } = mRef;
    const { leafletElement: map } = current;
    _map = map;
    map.locate({
      setView: true,
    });
    setTimeout(() => {}, 1000);
    map.on("locationfound", handleLocation)
  }, [mRef]);

  const handleLocation = (event) => {
    const { lat, lng } = event.latlng;

    const date = new Date(event.timestamp).toUTCString();
    // console.log(new Date(event.timestamp).toISOString());
    getLocalStorage();

    A.marker([lat, lng]).bindPopup(date).openPopup().addTo(_map);
    _map.setZoom(zoom);
    if (db.length === 0) db.push({ lat, lng, date });

    setLocalStorage();
  };

  const addHandler = () => {
    const { lat, lng } = _map.getCenter();
    const date = new Date().toUTCString();
    A.marker([lat, lng]).bindPopup(date).openPopup().addTo(_map);
    db.push({ lat, lng, date });
    setLocalStorage();
  }
  
  const clearHandler = () => {
    localStorage.removeItem("locations");
    db = [];
    window.location.reload(false); //page refresh but datas
  };

  const downloadHandler = () => {
    const fileData = JSON.stringify(db, null,1); 
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "locationinfo.json";
    link.href = url;
    link.click();
  }; //download to json

  const setLocalStorage = () => {
    localStorage.setItem("locations", JSON.stringify(db));
  };

  const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("locations"));
    if (!data) return;
    db = data;

    data.forEach((location) => {
      renderLocations(location);
    });
  };
  const renderLocations = (location) => {
    A.marker([location.lat, location.lng])
      .addTo(_map)
      .bindPopup()
      .setPopupContent(`${location.date}`)
      .openPopup();
  };

  return (
    <Container>
      <MapCon itemID="leafletmap" id="leafletmap">
        <Map ref={mRef} center={[0, 0]} zoom={zoom} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </MapCon>
      <ControlContainer>
        <Button class="button-15" onClick={addHandler}>Add </Button>
        <Button class="button-15" onClick={clearHandler}>Clear</Button>
        <Button class="button-15" onClick={downloadHandler}>Download</Button>
      </ControlContainer>
    </Container>
  );
};

export default Back;

const Container = styled.div`
  display: inline-block;
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 5px;
  max-height: 73vh;
  background: transparent; 
  
`;

const MapCon = styled.div`
  
  height: 100%;
  width: 100%;
  display: inline-block;
  border-radius: 30px;
`;

const ControlContainer = styled.div`
  flex-grow: 1;
  margin-left: center;
`;

const Button = styled.button`
  color: #fff;
  background: red;
  width: 400px;
  height: 100px;
  font-size: 16px;
  font-family: "Montserrat", "sans-serif";
  flex-grow: 1;
  outline: none;
  border: none;
  display: inline-block;
  justify-content: left;
  align-items: center;
  transition: all 0.2s ease-in-out;
  background-image: linear-gradient(#42A1EC, #0070C9);
  border: 1px solid white;
  border-radius: 3px;
  box-sizing: content-box;
  cursor: pointer;
  direction: ltr;
  display: inline-block;
  letter-spacing: -.022em;
  line-height: 1.47059;
  overflow: visible;
  text-align: center;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: red;
  }
`;
