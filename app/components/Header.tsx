"use client";
import React from "react";
import { useLocation } from "../hooks/useLocation";
import { useWeather } from "../hooks/useWeather";
import { useLocationName } from "../hooks/useLocationName";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";

const Header = () => {
  const location = useLocation();
  const weather = useWeather(location);
  const name = useLocationName(location);
  if (!location || !weather) return null;

  return (
    <div>
      <article className="flex flex-col items-center gap-0.5 py-12 text-center text-black">
        {/* Location */}
        <h2 className="text-2xl font-light">{String(name)}</h2>
        {/* Current Temp */}
        <h1 className="relative w-fit text-7xl font-extralight">
          {Number(weather.current.temp.toFixed(0))}
          <span className="absolute -right-3 top-0 text-4xl">&deg;</span>
        </h1>
        {/* Current conditions */}
        <h3 className="font-light">
          {String(weather.current.weather[0]?.main)}
        </h3>
        {/* Daily min/max temp */}
        <h3 className="flex items-center gap-2 font-light text-neutral-900">
          <span className="flex items-center">
            <BsArrowUpShort />
            {Number(weather.daily[0].temp.max.toFixed(0))}&deg;
          </span>
          <span className="flex items-center">
            <BsArrowDownShort />
            {Number(weather.daily[0].temp.min.toFixed(0))}&deg;
          </span>
        </h3>
      </article>

      {/* Weather alerts */}
      {weather?.alerts && weather?.alerts.length > 0 && (
        <div className="flex  w-full items-center gap-2 rounded-md border border-orange-400 bg-slate-500/50 p-2">
          <IoIosWarning className="flex-shrink-0 text-3xl text-orange-400" />
          <div className="flex min-w-0 flex-col gap-0.5">
            <h3 className="text-lg text-orange-400">
              {weather.alerts[0].event}
            </h3>
            <p className="text-sm text-neutral-900">
              {weather.alerts[0].description}
            </p>
            <p className="mt-1 truncate text-center text-xs text-neutral-600">
              {weather.alerts[0].sender_name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
