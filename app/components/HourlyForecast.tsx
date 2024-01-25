"use client";
import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import Divider from "./Divider";
import { useLocation } from "../hooks/useLocation";
import { useWeather } from "../hooks/useWeather";

const HourlyForecast = () => {
  const location = useLocation();
  const weather = useWeather(location);
  if (!location || !weather) return null;

  const unixToHour = (unix: number): string => {
    const date = new Date(unix * 1000);
    const formattedHour = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
    }).format(date);
    const [hour, ampm] = formattedHour.split(" ");
    return `${hour}${ampm}`;
  };

  return (
    <div className="w-full rounded-xl border border-[#67728022] bg-[#bac3ce8c] p-2.5 pb-0">
      <div className="mb-2.5 flex items-center gap-2 text-sm text-neutral-900">
        <IoTimeOutline className="text-lg" />
        <h3 className="font-medium uppercase">Hourly Forecast</h3>
      </div>

      <Divider />

      <div className="hide-scrollbar flex items-center gap-8 overflow-x-scroll whitespace-nowrap py-1.5">
        {weather.hourly.slice(0, 25).map((hour: any, idx: number) => (
          <div
            key={hour.dt}
            className="grid grid-rows-3 place-items-center gap-0"
          >
            <h4 className="text-xs">{unixToHour(hour.dt)}</h4>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt="weather icon"
              className="h-8 w-8 max-w-full"
            />
            <h4>{Number(hour.temp.toFixed(0))}&deg;</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
