
import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("yamunanagar");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=03dd82befdd5d213aadbfb7440970152`;

      let res = await fetch(url);
      let data = await res.json();

        // main me jakr temp me mera temprature h toh use array descructuring
        // temp hme farahnite me milega use celcius me krne ke liye url me &matric& likhna pdega
      const { temp, humidity, pressure } = data.main;
        // becaz whether ek array h and 0 index ke main pr cloud pda h
        // main ka naam change kr diya: ka use krke
      const { main: weathermood } = data.weather[0];
        // name bahr hi pda h
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
        //  new object bnana h jisme sb ho
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };
  //By default mujhe yamunanagar dikhaye toh iske liye useEffect hook is used
  useEffect(() => {
    //Page refresh hote hi ye function call ho jaye
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <Weathercard {...tempInfo} />
    </>
  );
};

export default Temp;