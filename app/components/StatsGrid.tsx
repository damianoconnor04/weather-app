"use client";
import React from "react";
import { useLocation } from "../hooks/useLocation";
import { useWeather } from "../hooks/useWeather";
import { IoThermometerOutline } from "react-icons/io5";
import { TbGrain, TbSunset2 } from "react-icons/tb";
import { PiWindLight } from "react-icons/pi";

const StatsGrid = () => {
  const location = useLocation();
  const weather = useWeather(location);
  if (!location || !weather) return null;

  const isFeelsLikeSimilarToActual = (
    feelsLike: number,
    temp: number,
  ): string => {
    // const feelsLike = Number(weather.current.feels_like.toFixed(0));
    // const temp = Number(weather.current.temp.toFixed(0));
    const difference = Math.abs(feelsLike - temp);
    const isSimilar: boolean = difference < 3;
    if (isSimilar) {
      return "Similar to the actual temperature";
    } else {
      return difference > 0
        ? "Humidity is making it feel warmer."
        : "Wind is making it feel cooler.";
    }
  };

  const unixToTime = (unix: number): string => {
    const date = new Date(unix * 1000);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    }).format(date);
    const [hour, minute] = formattedTime.split(" ");
    return `${hour}${minute}`;
  };

  const getWindDirection = (deg: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      {/* feels like */}
      <div className="flex w-full flex-col rounded-xl border border-[#67728022] bg-[#bac3ce8c] p-2.5">
        {/* header */}
        <div className="mb-2.5 flex items-center gap-2 text-sm text-neutral-900">
          <IoThermometerOutline className="text-lg" />
          <h3 className="font-medium uppercase">Feels like</h3>
        </div>

        {/* body */}
        <h4 className="mb-4 flex-grow text-3xl font-light">
          {weather.current.feels_like}&deg;
        </h4>
        <p className="text-sm text-neutral-600">
          {isFeelsLikeSimilarToActual(
            Number(weather.current.feels_like.toFixed(0)),
            Number(weather.current.temp.toFixed(0)),
          )}
        </p>
      </div>

      {/* sunset */}
      <div className="flex w-full flex-col rounded-xl border border-[#67728022] bg-[#bac3ce8c] p-2.5">
        {/* header */}
        <div className="mb-2.5 flex items-center gap-2 text-sm text-neutral-900">
          <TbSunset2 className="text-lg" />
          <h3 className="font-medium uppercase">Sunset</h3>
        </div>

        {/* body */}
        <h4 className="mb-4 flex-grow text-3xl font-light">
          {unixToTime(weather.current.sunset)}
        </h4>
        <p className="text-sm text-neutral-600">
          Sunrise: {unixToTime(weather.current.sunrise)}
        </p>
      </div>

      {/* humidity */}
      <div className="flex w-full flex-col rounded-xl border border-[#67728022] bg-[#bac3ce8c] p-2.5">
        {/* header */}
        <div className="mb-2.5 flex items-center gap-2 text-sm text-neutral-900">
          <TbGrain className="text-lg" />
          <h3 className="font-medium uppercase">Humidity</h3>
        </div>

        {/* body */}
        <div>
          <h4 className="mb-4 flex-grow text-3xl font-light">
            {weather.current.humidity}%
          </h4>
          <p className="text-sm text-neutral-600">
            The dew point is {weather.current.dew_point}&deg; right now
          </p>
        </div>
      </div>

      {/* wind */}
      <div className="flex w-full flex-col rounded-xl border border-[#67728022] bg-[#bac3ce8c] p-2.5">
        {/* header */}
        <div className="mb-2.5 flex items-center gap-2 text-sm text-neutral-900">
          <PiWindLight className="text-lg" />
          <h3 className="font-medium uppercase">Wind</h3>
        </div>

        {/* body */}
        <div className="relative mx-auto grid aspect-square w-1/2 place-items-center rounded-full border border-[#6772808c] bg-[#6772800f]">
          {/* center mph */}
          <div className="grid aspect-square h-10 place-items-center rounded-full bg-[#b5bbc1]">
            <p className="text-md flex-grow text-center font-light">
              {weather.current.wind_speed}
            </p>
            <p className="-mt-3 flex-grow text-center text-xs font-light">
              mph
            </p>
          </div>
          {/* directions */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 text-xs">
            N
          </div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs">
            E
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs">
            S
          </div>
          <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs">
            W
          </div>
          {/* direction pointer */}
          {weather.current.wind_deg !== 0 && (
            <div
              className={`absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 bg-black rotate-[${weather.current.wind_deg}]`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
