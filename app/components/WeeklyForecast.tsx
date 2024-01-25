"use client";
import React from "react";
import { useLocation } from "../hooks/useLocation";
import { useWeather } from "../hooks/useWeather";
import { IoCalendarOutline } from "react-icons/io5";
import Divider from "./Divider";

const WeeklyForecast = () => {
  const location = useLocation();
  const weather = useWeather(location);
  if (!location || !weather) return null;

  const unixToDay = (unix: number): string => {
    const date = new Date(unix * 1000);
    const day = date.getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  };

  console.log(weather);

  return (
    <div className="w-full rounded-xl border border-[#67728022] bg-[#bac3ce8c] p-2.5 pb-0">
      <div className="mb-2.5 flex items-center gap-2 text-sm text-neutral-900">
        <IoCalendarOutline className="text-lg" />
        <h3 className="font-medium uppercase">7-day forecast</h3>
      </div>

      <Divider />

      <div>
        {weather.daily.map((day: any, idx: number) => (
          <>
            <div
              key={day.dt}
              className="grid w-full grid-cols-3 items-center justify-between py-1.5"
            >
              <h4
                className={`text-neutral-900 ${idx === 0 && "font-semibold"}`}
              >
                {idx === 0 ? "Today" : String(unixToDay(day.dt))}
              </h4>

              <div className="h-8 w-8 rounded-full">
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="weather icon"
                  className="h-8 w-8"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <h4 className="text-neutral-600">
                  {Number(day.temp.min.toFixed(0))}&deg;
                </h4>

                <div className="h-0.5 w-full bg-gradient-to-r from-blue-400 to-amber-400"></div>

                <h4 className="text-neutral-900">
                  {Number(day.temp.max.toFixed(0))}&deg;
                </h4>
              </div>
            </div>
            {idx !== weather.daily.length - 1 && <Divider />}
          </>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
