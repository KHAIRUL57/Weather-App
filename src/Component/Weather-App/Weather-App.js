import React, { useState } from "react";
import "./Weather-App.css";
import axios from "../../../node_modules/axios/dist/axios";

const api = {
  key: "12040d26242efedf3d0eafc7f6d14350",
  base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherApp = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
                <div className="date">{dateBuilder(new Date())}</div>
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
                  <div>
                    <span className="weather">{weather.weather[0].main}</span>
                  </div>
                </div>
                <div className="container">
                  <div>
                    <table>
                      <tbody>
                        <tr className="section1">
                          <td>
                            <h4>High/Low :</h4>
                          </td>
                          <td>
                            <span>
                              {Math.floor(weather.main.temp_max - 273.15)} /{" "}
                              {Math.floor(weather.main.temp_min - 273.15)}º
                            </span>
                          </td>
                        </tr>
                        <br />
                        <tr className="section1">
                          <td>
                            <h4>Humidity :</h4>
                          </td>
                          <td>
                            <span>{weather.main.humidity} %</span>
                          </td>
                        </tr>
                        <br />
                        <tr className="section1">
                          <td>
                            <h4>Pressure :</h4>
                          </td>
                          <td>
                            <span>{weather.main.pressure} hPa</span>
                          </td>
                        </tr>
                        <br />
                        <tr className="section1">
                          <td>
                            <h4>Visibilty :</h4>
                          </td>
                          <td>
                            <span>{weather.visibility / 1000} km</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table>
                      <tbody>
                        <tr className="section2">
                          <td>
                            <h4>Wind :</h4>
                          </td>
                          <td>
                            <span>
                              {Math.floor((weather.wind.speed * 18) / 5)}km/hr
                            </span>
                          </td>
                        </tr>
                        <br />

                        <tr className="section2">
                          <td>
                            <h4>Wind Direction :</h4>
                          </td>
                          <td>
                            <span>{weather.wind.deg}ºdeg</span>
                          </td>
                        </tr>
                        <br />

                        <tr className="section2">
                          <td>
                            <h4>Sunrise :</h4>
                          </td>
                          <td>
                            <span>
                              {new Date(
                                weather.sys.sunrise * 1000
                              ).toLocaleTimeString()}
                            </span>
                          </td>
                        </tr>
                        <br />
                        <tr className="section2">
                          <td>
                            <h4>Sunset :</h4>
                          </td>
                          <td>
                            <span>
                              {new Date(
                                weather.sys.sunset * 1000
                              ).toLocaleTimeString()}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default WeatherApp;
